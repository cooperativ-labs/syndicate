"use server";

import { String0x } from "@src/web3/helpersChain";
import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

import {
  CurrencyCodeType,
  Document,
  OfferingFull,
  OfferingParticipant,
  OfferingType,
  offeringTypes,
  WhitelistTransactionType,
} from "@/types";

import { getOrderArrayFromContract } from "../helpersOrder";
import { getLowestOrderPrice } from "../helpersOrder";
import { ContractOrder } from "@src/components/investor/tradingForms/offering-actions-types";

import { getOfferingSmartContractSet } from "./cryptoActions";
import { retrieveOrders } from "./orderActions";

type AddOfferingParams = {
  offeringEntityId: string;
  name: string;
  organizationId: string;
};

type AddOfferingResult = {
  affectedCount: number;
  records: { id: number }[];
};

export async function addOffering({
  offeringEntityId,
  name,
  organizationId,
}: AddOfferingParams): Promise<AddOfferingResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("offering")
    .insert(
      {
        offering_entity_id: Number(offeringEntityId),
        name: name,
      },
      { count: "exact" },
    )
    .select("id");

  if (error) {
    throw error;
  }

  revalidatePath(`/${organizationId}`, "page");

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as { id: number }[],
  };
}

export async function getOfferingById(
  offeringId: string,
): Promise<OfferingFull> {
  const supabase = createClient();
  const [{ data: offeringRes, error }, smartContracts] = await Promise.all([
    supabase
      .from("offering")
      .select(
        [
          "*",
          "legalEntity:legal_entity(*, addresses:address(*), jurisdiction:jurisdiction(*))",
          "images:image(id, url, label, file_id)",
          "participants:offering_participant(*)",
          "offeringProfileDescriptions:offering_description_text(*)",
          "distributions:offering_distribution(*)",
        ].join(", "),
      )
      .eq("id", Number(offeringId)).single(),
    getOfferingSmartContractSet({ offeringId }),
  ]);

  const offering = offeringRes as unknown as OfferingFull;

  if (error) throw `getOfferingById: ${error.message}`;
  return { ...offering, offeringSmartContracts: smartContracts };
}

export async function getOfferingDocumentsById(
  offeringId: string | number,
): Promise<Document[]> {
  const supabase = createClient();
  const { data: documents, error } = await supabase
    .from("document")
    .select("*")
    .eq("offering_id", Number(offeringId));
  if (error) throw error;
  return documents;
}

export async function updateOfferingBasic({
  offeringId,
  isPublic,
  name,
  organizationId,
  accessCode,
}: {
  offeringId: string;
  isPublic: boolean;
  name: string;
  organizationId: string;
  accessCode: string | null;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("offering")
    .update({
      is_public: isPublic,
      name: name,
      access_code: accessCode ?? null,
    })
    .eq("id", Number(offeringId))
    .select("id, name, is_public, access_code");
  if (error) throw error;
  revalidatePath(`/${organizationId}`, "layout");
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
  isPublic,
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
    .from("offering")
    .update({
      name,
      brand_color: brandColor ?? null,
      light_brand: lightBrand ?? null,
      image: image ?? null,
      banner_image: bannerImage ?? null,
      primary_video: primaryVideo ?? null,
      website: website ?? null,
      short_description: shortDescription ?? null,
      is_public: isPublic ?? null,
    })
    .eq("id", Number(offeringId))
    .select(
      "id, name, brand_color, website, is_public, image, banner_image, primary_video, access_code",
    );

  if (error) throw error;

  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

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
  capRate,
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
  distributionPeriod?: string | null;
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
    .from("offering")
    .update({
      stage: stage ?? null,
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
      cap_rate: capRate ?? null,
    })
    .eq("offering_id", Number(offeringId))
    .select(
      [
        "id",
        "stage",
        "max_raise",
        "min_raise",
        "min_units_per_investor",
        "max_units_per_investor",
        "max_investors",
        "min_investors",
        "raise_start",
        "raise_period",
        "additional_info",
        "distribution_period",
        "distribution_frequency",
        "distribution_currency",
        "distribution_description",
        "admin_expense",
        "projected_irr",
        "projected_irr_max",
        "preferred_return",
        "target_equity_multiple",
        "target_equity_multiple_max",
        "coc_return",
        "projected_appreciation",
        "cap_rate",
        "offering_id",
      ].join(", "),
    );

  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

// Add offering_detail row
export async function updateOfferingDetails({
  offeringId,
  offeringType,
  investmentCurrencyCode,
  distributionCurrencyCode,
  numUnits,
  minUnitsPerInvestor,
  maxUnitsPerInvestor,
  priceStart,
  maxRaise,
}: {
  offeringId: string;
  offeringType: offeringTypes;
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
    .from("offering")
    .update({
      investment_currency: investmentCurrencyCode,
      distribution_currency: distributionCurrencyCode,
      num_units: numUnits ?? null,
      min_units_per_investor: minUnitsPerInvestor ?? null,
      max_units_per_investor: maxUnitsPerInvestor ?? null,
      price_start: priceStart ?? null,
      max_raise: maxRaise ?? null,
      type: offeringType,
    })
    .eq("id", Number(offeringId))
    .select(
      "id, offering_id, num_units, min_units_per_investor, max_units_per_investor, price_start, max_raise",
    );
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: data ?? [],
  };
}

// Update investment currency on offering_detail
export async function updateInvestmentCurrency({
  organizationId,
  offeringId,
  investmentCurrencyCode,
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
    .from("offering")
    .update({ investment_currency: investmentCurrencyCode })
    .eq("id", Number(offeringId))
    .select("id, investment_currency");
  if (error) throw error;
  revalidatePath(`/${organizationId}/offerings/${offeringId}`, "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

// Add legal share link (multiple operations)
export async function addLegalShareLink({
  documentOfferingUniqueId,
  offeringId,
  entityId,
  agreementText,
  smartContractId,
  agreementTitle,
}: {
  documentOfferingUniqueId: string;
  offeringId: string;
  entityId: string;
  agreementText: string;
  smartContractId: string;
  agreementTitle: string;
  // signature: string;
}): Promise<void> {
  const supabase = createClient();

  // 1) Turn off waitlist
  const { error: updateOfferingError } = await supabase
    .from("offering")
    .update({ waitlist_on: false })
    .eq("id", Number(offeringId));
  if (updateOfferingError) throw updateOfferingError;

  // 2) Insert smart contract set
  const { error: scError } = await supabase.from("offering_smart_contract_set")
    .insert({
      offering_id: Number(offeringId),
      share_contract_id: smartContractId,
    });
  if (scError) throw scError;

  // 3) Insert document
  const { error: docError } = await supabase.from("document").insert({
    title: agreementTitle,
    text: agreementText,
    type: "SHARE_LINK",
    format: "MARKDOWN",
    owner_id: entityId,
    offering_unique_id: documentOfferingUniqueId,
    offering_id: offeringId,
  });
  if (docError) throw docError;

  // 4) Mark smart contract established
  const { error: updateScError } = await supabase
    .from("smart_contract")
    .update({ established: true })
    .eq("id", smartContractId);
  if (updateScError) throw updateScError;

  revalidatePath("/", "page");
}

export async function getOfferingParticipant({
  walletAddress,
}: {
  walletAddress: string;
}): Promise<OfferingParticipant[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("offering_participant")
    .select("id, name, offering(*)")
    .eq("wallet_address", walletAddress);
  if (error) throw error;
  return data ?? [];
}

export async function addOfferingParticipant({
  addressOfferingId,
  name,
  offeringId,
  walletAddress,
  chainId,
}: {
  addressOfferingId: string;
  name?: string | null;
  offeringId: string;
  walletAddress: string;
  chainId: number;
}): Promise<{
  affectedCount: number;
  records: { id: string; name: string | null; offering_id: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_participant")
    .insert(
      {
        address_offering_id: addressOfferingId,
        name: name ?? null,
        offering_id: offeringId,
        wallet_address: walletAddress,
        chain_id: chainId,
      },
      { count: "exact" },
    )
    .select("id, name, offering_id");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function addOfferingParticipantWithApplication({
  dateSigned,
  addressOfferingId,
  name,
  offeringId,
  offeringEntityId,
  offeringUniqueId,
  walletAddress,
  minPledge,
  maxPledge,
  applicationText,
  applicationTitle,
  signature,
  offeringParticipantId,
}: {
  dateSigned: string;
  addressOfferingId: string;
  name?: string | null;
  offeringId: string | number;
  offeringEntityId: string | number;
  offeringUniqueId: string;
  walletAddress: string;
  minPledge?: number | null;
  maxPledge?: number | null;
  applicationText: string;
  applicationTitle: string;
  signature: string;
  offeringParticipantId: string;
}): Promise<void> {
  const supabase = createClient();

  // Insert participant
  const { error: pErr } = await supabase.from("offering_participant").insert({
    address_offering_id: addressOfferingId,
    name: name ?? null,
    offering_id: Number(offeringId),
    wallet_address: walletAddress,
    min_pledge: minPledge ?? null,
    max_pledge: maxPledge ?? null,
  });
  if (pErr) throw pErr;

  // Insert application with nested document (flattened as two steps)
  const { data: appDoc, error: docErr } = await supabase
    .from("document")
    .insert({
      text: applicationText,
      date: dateSigned,
      type: "AGREEMENT",
      owner_id: Number(offeringEntityId),
      offering_unique_id: offeringUniqueId,
      title: applicationTitle,
    })
    .select("id")
    .single();
  if (docErr) throw docErr;

  const { error: appErr } = await supabase.from("investor_application").insert({
    offering_participant_id: offeringParticipantId,
    application_doc_id: appDoc.id,
  });
  if (appErr) throw appErr;

  // Insert document signatory
  const { error: sigErr } = await supabase.from("document_signatory").insert({
    document_id: offeringParticipantId,
    signature,
    date: dateSigned,
    archived: false,
    signer_address: walletAddress,
  });
  if (sigErr) throw sigErr;

  revalidatePath("/", "page");
}

export type AddWhitelistMemberParams = {
  organizationId: string | number;
  offeringId: string | number;
  addressOfferingId: string;
  walletAddress: String0x;
  chainId: number;
  name?: string | null;
  externalId?: string | null;
  transactionHash?: string | null;
  type:
    | typeof WhitelistTransactionType.ADD
    | typeof WhitelistTransactionType.REMOVE;
};

export async function addWhitelistMember({
  organizationId,
  offeringId,
  addressOfferingId,
  walletAddress,
  chainId,
  name,
  externalId,
  transactionHash,
  type,
}: AddWhitelistMemberParams): Promise<void> {
  const supabase = createClient();

  const { data: participant, error: pErr } = await supabase
    .from("offering_participant")
    .insert({
      address_offering_id: addressOfferingId,
      wallet_address: walletAddress,
      chain_id: chainId,
      name: name ?? null,
      offering_id: offeringId,
      external_id: externalId ?? null,
    })
    .select("id")
    .single();
  if (pErr) throw pErr;

  const { error: wErr } = await supabase.from("whitelist_transaction").insert({
    offering_participant_id: offering,
    transaction_hash: transactionHash ?? null,
    type,
  });
  if (wErr) throw wErr;

  revalidatePath(`/${organizationId}/offerings/${offeringId}`, "page");
}

export type UpdateWhitelistParams = {
  organizationId: string | number;
  offeringId: string | number;
  offeringParticipantId: string;
  transactionHash: string;
  type:
    | typeof WhitelistTransactionType.ADD
    | typeof WhitelistTransactionType.REMOVE;
};

export async function updateWhitelist({
  organizationId,
  offeringId,
  offeringParticipantId,
  transactionHash,
  type,
}: UpdateWhitelistParams): Promise<void> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("whitelist_transaction")
    .update({ transaction_hash: transactionHash, type })
    .eq("offering_participant_id", offeringParticipantId)
    .select("id, transaction_hash, type");
  if (error) throw error;
  revalidatePath(`/${organizationId}/offerings/${offeringId}`, "page");
}

export async function updateOfferingParticipant({
  id,
  name,
  externalId,
  jurCountry,
}: {
  id: string;
  name?: string | null;
  externalId?: string | null;
  jurCountry: string;
}): Promise<{
  affectedCount: number;
  records: {
    id: string;
    wallet_address: string;
    external_id: string | null;
    name: string | null;
    offering_id: string;
  }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_participant")
    .update({
      name: name ?? null,
      external_id: externalId ?? null,
      jurisdiction_id: jurCountry,
    })
    .eq("id", id)
    .select("id, wallet_address, external_id, name, offering_id");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function removeWhitelistObject(
  { participantId }: { participantId: string },
): Promise<{
  affectedCount: number;
  records: { id: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_participant")
    .delete()
    .eq("id", participantId)
    .select("id");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function archiveOfferingParticipant({
  participantId,
}: {
  participantId: string;
}): Promise<{
  affectedCount: number;
  records: { id: string; archived: boolean }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_participant")
    .update({ archived: true })
    .eq("id", participantId)
    .select("id, archived");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function createDescriptionText({
  offeringId,
  title,
  text,
  section,
  order,
}: {
  offeringId: string;
  title: string;
  text: string;
  section: string;
  order: number;
}): Promise<{
  affectedCount: number;
  records: {
    id: string;
    offering_id: string;
    title: string;
    text: string;
    section: string;
    order: number;
  }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_description_text")
    .insert(
      { offering_id: Number(offeringId), title, text, section, order },
      {
        count: "exact",
      },
    )
    .select("id, offering_id, title, text, section, order");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function updateDescriptionText({
  descriptionId,
  title,
  text,
  section,
  order,
}: {
  descriptionId: string;
  title: string;
  text: string;
  section: string;
  order: number;
}): Promise<{
  affectedCount: number;
  records: {
    id: string;
    text: string;
    title: string;
    section: string;
    order: number;
    offering_id: string;
  }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_description_text")
    .update({ title, text, section, order })
    .eq("id", descriptionId)
    .select("id, text, title, section, order, offering_id");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function deleteDescriptionText(
  { descriptionId }: { descriptionId: string },
): Promise<{
  affectedCount: number;
  records: { id: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_description_text")
    .delete()
    .eq("id", descriptionId)
    .select("id");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

export async function getCurrentOrdersAndPrice({
  offeringId,
  paymentTokenDecimals,
  priceStart,
}: {
  offeringId: string;
  paymentTokenDecimals: number;
  priceStart: number;
}): Promise<{ currentPrice: number; contractSaleList: ContractOrder[] | [] }> {
  try {
    const smartContracts = await getOfferingSmartContractSet({
      offeringId: offeringId,
    });
    const swapContractAddress = smartContracts?.swapContract?.cryptoAddress
      .address as String0x;
    const orders = await retrieveOrders(swapContractAddress);
    const contractSaleList = paymentTokenDecimals && orders && orders.length > 0
      ? await getOrderArrayFromContract(
        orders,
        swapContractAddress,
        paymentTokenDecimals,
      )
      : [];

    const currentPrice = contractSaleList
      ? getLowestOrderPrice(contractSaleList, priceStart)
      : 0;

    return { currentPrice, contractSaleList };
  } catch (error: any) {
    throw `getCurrentOrdersAndPrice: ${error.message}`;
  }
}
