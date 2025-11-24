'use server';

import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import {
  CurrencyCodeType,
  DistributionPeriodTypes,
  Document,
  OfferingTabSectionTypes,
  OfferingTypes,
  RevalidationPath
} from '@/types';

import { OfferingStage } from '../enumConverters';

export async function updateOfferingBasic({
  offeringId,
  isPublic,
  name,
  organizationId,
  accessCode
}: {
  offeringId: string;
  isPublic: boolean;
  name: string;
  organizationId: string;
  accessCode: string | null;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('offering')
    .update({
      is_public: isPublic,
      name: name,
      access_code: accessCode ?? null
    })
    .eq('id', Number(offeringId))
    .select('id, name, is_public, access_code');
  if (error) throw error;
  revalidatePath(`/manager/${organizationId}`, 'layout');
}

export async function updateOfferingDetails({
  offeringId,
  offeringType,
  investmentCurrencyCode,
  distributionCurrencyCode,
  numUnits,
  minUnitsPerInvestor,
  maxUnitsPerInvestor,
  priceStart,
  maxRaise
}: {
  offeringId: string;
  offeringType: OfferingTypes;
  investmentCurrencyCode: CurrencyCodeType;
  distributionCurrencyCode: CurrencyCodeType;
  numUnits: number | null;
  minUnitsPerInvestor?: number | null;
  maxUnitsPerInvestor?: number | null;
  priceStart?: number | null;
  maxRaise?: number | null;
}): Promise<{ affectedCount: number; records: any[] }> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('offering')
    .update({
      investment_currency: investmentCurrencyCode,
      distribution_currency: distributionCurrencyCode,
      num_units: numUnits ?? null,
      min_units_per_investor: minUnitsPerInvestor ?? null,
      max_units_per_investor: maxUnitsPerInvestor ?? null,
      price_start: priceStart ?? null,
      max_raise: maxRaise ?? null,
      type: offeringType
    })
    .eq('id', Number(offeringId))
    .select(
      'id, num_units, min_units_per_investor, max_units_per_investor, price_start, max_raise'
    );
  if (error) throw error;
  revalidatePath(`/manager/[organizationId]/offerings/${offeringId}`, 'page');
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: data ?? []
  };
}

// Update offering profile fields
export async function updateOfferingProfile({
  offeringId,
  name,
  brandColor,
  lightBrand,
  image,
  bannerImage,
  primaryVideo,
  website,
  shortDescription,
  isPublic
}: {
  offeringId: string;
  name: string;
  brandColor?: string | null;
  lightBrand?: boolean | null;
  image?: string | null;
  bannerImage?: string | null;
  primaryVideo?: string | null;
  website?: string | null;
  shortDescription?: string | null;
  isPublic?: boolean | null;
}): Promise<{
  affectedCount: number;
  records: {
    id: string;
    name: string;
    brand_color: string | null;
    website: string | null;
    is_public: boolean | null;
    image: string | null;
    banner_image: string | null;
    primary_video: string | null;
  }[];
}> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('offering')
    .update({
      name,
      brand_color: brandColor ?? null,
      light_brand: lightBrand ?? null,
      image: image ?? null,
      banner_image: bannerImage ?? null,
      primary_video: primaryVideo ?? null,
      website: website ?? null,
      short_description: shortDescription ?? null,
      is_public: isPublic ?? null
    })
    .eq('id', Number(offeringId))
    .select(
      'id, name, brand_color, website, is_public, image, banner_image, primary_video, access_code'
    );

  if (error) throw error;

  revalidatePath('/', 'page');
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as any
  };
}

export const uploadOfferingAsset = async ({
  offeringId,
  assetFile,
  assetName,
  assetType
}: {
  offeringId: string | number;
  assetFile: File;
  assetName: string; //using file.name = "blob"
  assetType: 'image' | 'banner_image';
}): Promise<void> => {
  const supabase = createClient();
  let assetPath = `${offeringId}/${assetType}/${assetName}`;
  const { data: assetData, error: assetError } = await supabase.storage
    .from('offering-assets')
    .upload(assetPath, assetFile, {
      upsert: true
    });

  if (assetError) {
    throw new Error(assetError.message);
  }
  assetPath = assetData?.path || assetPath;

  try {
    await supabase
      .from('offering')
      .update({
        [assetType]: assetPath
      })
      .eq('id', Number(offeringId));
    revalidatePath(`/manager/[organizationId]/offerings/${offeringId}`, 'layout');
  } catch (error) {
    console.error(error);
    throw new Error(
      `uploadOfferingAsset: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const deleteOfferingAsset = async ({
  offeringId,
  assetUrl,
  assetType
}: {
  offeringId: string | number;
  assetUrl: string;
  assetType: 'image' | 'banner_image';
}): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.storage.from('offering-assets').remove([assetUrl]);
  if (error) {
    throw new Error(error.message);
  }
  await supabase
    .from('offering')
    .update({
      [assetType]: null
    })
    .eq('id', Number(offeringId));
  revalidatePath(`/manager/[organizationId]/offerings/${offeringId}`, 'layout');
};

// Update offering financial details (offering_detail)
export async function updateOfferingFinancial({
  offeringId,
  stage,
  maxRaise,
  minRaise,
  maxInvestors,
  minInvestors,
  minUnitsPerInvestor,
  maxUnitsPerInvestor,
  raiseStart,
  raisePeriod,
  additionalInfo,
  distributionPeriod,
  distributionFrequency,
  distributionCurrency,
  distributionDescription,
  adminExpense,
  projectedIrr,
  projectedIrrMax,
  preferredReturn,
  targetEquityMultiple,
  targetEquityMultipleMax,
  cocReturn,
  projectedAppreciation,
  capRate
}: {
  offeringId: string;
  stage?: string | null;
  maxRaise?: number | null;
  minRaise?: number | null;
  maxInvestors?: number | null;
  minInvestors?: number | null;
  minUnitsPerInvestor?: number | null;
  maxUnitsPerInvestor?: number | null;
  raiseStart?: string | null;
  raisePeriod?: number | null;
  additionalInfo?: string | null;
  distributionPeriod?: DistributionPeriodTypes | null;
  distributionFrequency?: number | null;
  distributionCurrency?: CurrencyCodeType | null;
  distributionDescription?: string | null;
  adminExpense?: number | null;
  projectedIrr?: number | null;
  projectedIrrMax?: number | null;
  preferredReturn?: number | null;
  targetEquityMultiple?: number | null;
  targetEquityMultipleMax?: number | null;
  cocReturn?: number | null;
  projectedAppreciation?: number | null;
  capRate?: number | null;
}): Promise<{
  affectedCount: number;
  records: {
    id: string;
    stage: string | null;
    max_raise: number | null;
    min_raise: number | null;
    min_units_per_investor: number | null;
    max_units_per_investor: number | null;
    max_investors: number | null;
    min_investors: number | null;
    raise_start: string | null;
    raise_period: number | null;
    additional_info: string | null;
    distribution_period: string | null;
    distribution_frequency: number | null;
    distribution_description: string | null;
    admin_expense: number | null;
    projected_irr: number | null;
    projected_irr_max: number | null;
    preferred_return: number | null;
    target_equity_multiple: number | null;
    target_equity_multiple_max: number | null;
    coc_return: number | null;
    projected_appreciation: number | null;
    cap_rate: number | null;
    offering_id: string;
  }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('offering')
    .update({
      stage: stage as OfferingStage | null,
      max_raise: maxRaise ?? null,
      min_raise: minRaise ?? null,
      max_investors: maxInvestors ?? null,
      min_investors: minInvestors ?? null,
      min_units_per_investor: minUnitsPerInvestor ?? null,
      max_units_per_investor: maxUnitsPerInvestor ?? null,
      raise_start: raiseStart ?? null,
      raise_period: raisePeriod ?? null,
      additional_info: additionalInfo ?? null,
      distribution_period: distributionPeriod ?? null,
      distribution_frequency: distributionFrequency ?? null,
      distribution_currency: distributionCurrency ?? null,
      distribution_description: distributionDescription ?? null,
      admin_expense: adminExpense ?? null,
      projected_irr: projectedIrr ?? null,
      projected_irr_max: projectedIrrMax ?? null,
      preferred_return: preferredReturn ?? null,
      target_equity_multiple: targetEquityMultiple ?? null,
      target_equity_multiple_max: targetEquityMultipleMax ?? null,
      coc_return: cocReturn ?? null,
      projected_appreciation: projectedAppreciation ?? null,
      cap_rate: capRate ?? null
    })
    .eq('offering_id', Number(offeringId))
    .select(
      [
        'id',
        'stage',
        'max_raise',
        'min_raise',
        'min_units_per_investor',
        'max_units_per_investor',
        'max_investors',
        'min_investors',
        'raise_start',
        'raise_period',
        'additional_info',
        'distribution_period',
        'distribution_frequency',
        'distribution_currency',
        'distribution_description',
        'admin_expense',
        'projected_irr',
        'projected_irr_max',
        'preferred_return',
        'target_equity_multiple',
        'target_equity_multiple_max',
        'coc_return',
        'projected_appreciation',
        'cap_rate',
        'offering_id'
      ].join(', ')
    );

  if (error) throw error;
  revalidatePath('/', 'page');
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as any
  };
}

// Update investment currency on offering_detail
export async function updateInvestmentCurrency({
  organizationId,
  offeringId,
  investmentCurrencyCode
}: {
  organizationId: string;
  offeringId: number | string;
  investmentCurrencyCode: CurrencyCodeType;
}): Promise<{
  affectedCount: number;
  records: {
    id: number;
    investment_currency: CurrencyCodeType;
  }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('offering')
    .update({ investment_currency: investmentCurrencyCode })
    .eq('id', Number(offeringId))
    .select('id, investment_currency');
  if (error) throw error;
  revalidatePath(`/manager/${organizationId}/offerings/${offeringId}`, 'page');
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as any
  };
}

export async function createDescriptionText({
  offeringId,
  title,
  text,
  section,
  order,
  revalidationPath
}: {
  offeringId: string;
  title: string;
  text: string;
  section: OfferingTabSectionTypes;
  order: number;
  revalidationPath: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('offering_description_text')
    .insert(
      {
        offering_id: Number(offeringId),
        title,
        text,
        section: section as OfferingTabSectionTypes,
        order
      },
      {
        count: 'exact'
      }
    )
    .select('id, offering_id, title, text, section, order');
  if (error) throw error;
  revalidatePath(revalidationPath.path, revalidationPath.type);
}

export async function updateDescriptionText({
  descriptionId,
  title,
  text,
  section,
  order,
  revalidationPath
}: {
  descriptionId: string;
  title: string;
  text: string;
  section: OfferingTabSectionTypes;
  order: number;
  revalidationPath: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('offering_description_text')
    .update({ title, text, section, order })
    .eq('id', descriptionId)
    .select('id, text, title, section, order, offering_id');
  if (error) throw error;
  revalidatePath(revalidationPath.path, revalidationPath.type);
}

export async function deleteDescriptionText({
  descriptionId,
  revalidationPath
}: {
  descriptionId: string;
  revalidationPath: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('offering_description_text')
    .delete()
    .eq('id', descriptionId)
    .select('id');
  if (error) throw error;
  revalidatePath(revalidationPath.path, revalidationPath.type);
}
