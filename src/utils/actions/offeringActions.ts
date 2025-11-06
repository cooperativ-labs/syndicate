"use server";

import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

import { Document, OfferingFull, OfferingParticipant } from "@/types";

import { getOfferingSmartContractSet } from "./cryptoActions";

type AddOfferingParams = {
  offeringEntityId: string;
  name: string;
  organizationId: string;
};

type AddOfferingResult = {
  affectedCount: number;
  records: { id: string }[];
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
        offering_entity_id: offeringEntityId,
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
    records: (data ?? []) as { id: string }[],
  };
}

export async function getOfferingById(
  offeringId: string,
): Promise<OfferingFull> {
  const supabase = createClient();
  const [offeringRes, smartContracts] = await Promise.all([
    supabase
      .from("offering")
      .select(
        [
          "*",
          "legalEntity:legal_entity(*, addresses:address(*))",
          "images:image(id, url, label, file_id)",
          "participants:offering_participant(*)",
          "offeringProfileDescriptions:offering_description_text(*)",
        ].join(", "),
      )
      .eq("id", offeringId),
    getOfferingSmartContractSet(offeringId),
  ]);

  const { data, error } = offeringRes;
  if (error) throw `getOfferingById: ${error.message}`;
  const rows = (data ?? []) as any[];
  return { ...rows[0], offeringSmartContracts: smartContracts };
}

export async function getOfferingDocumentsById(
  offeringId: string,
): Promise<Document[]> {
  const supabase = createClient();
  const { data: documents, error } = await supabase
    .from("document")
    .select("*")
    .eq("offering_id", offeringId);
  if (error) throw error;
  return documents;
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
  accessCode,
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
  accessCode?: string | null;
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
    access_code: string | null;
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
      access_code: accessCode ?? null,
    })
    .eq("id", offeringId)
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
    .from("offering_detail")
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
    .eq("offering_id", offeringId)
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
export async function addOfferingDetails({
  offeringId,
  offeringDetailsType,
  investmentCurrencyCode,
  distributionCurrencyCode,
  numUnits,
  minUnitsPerInvestor,
  maxUnitsPerInvestor,
  priceStart,
  maxRaise,
}: {
  offeringId: string;
  offeringDetailsType: string;
  investmentCurrencyCode: string;
  distributionCurrencyCode: string;
  numUnits: number;
  minUnitsPerInvestor?: number | null;
  maxUnitsPerInvestor?: number | null;
  priceStart?: number | null;
  maxRaise?: number | null;
}): Promise<{ affectedCount: number; records: any[] }> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_detail")
    .insert(
      {
        offering_id: offeringId,
        type: offeringDetailsType,
        investment_currency: investmentCurrencyCode,
        distribution_currency: distributionCurrencyCode,
        num_units: numUnits,
        min_units_per_investor: minUnitsPerInvestor ?? null,
        max_units_per_investor: maxUnitsPerInvestor ?? null,
        price_start: priceStart ?? null,
        max_raise: maxRaise ?? null,
      },
      { count: "exact" },
    )
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
  offeringDetailsId,
  investmentCurrencyCode,
}: {
  offeringDetailsId: string;
  investmentCurrencyCode: string;
}): Promise<{
  affectedCount: number;
  records: { id: string; investment_currency: string; offering_id: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("offering_detail")
    .update({ investment_currency: investmentCurrencyCode })
    .eq("id", offeringDetailsId)
    .select("id, investment_currency, offering_id");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
}

// Add legal share link (multiple operations)
export async function addLegalShareLink({
  currentDate,
  documentOfferingUniqueId,
  offeringId,
  entityId,
  agreementText,
  smartContractId,
  agreementTitle,
  signature,
}: {
  currentDate: string;
  documentOfferingUniqueId: string;
  offeringId: string;
  entityId: string;
  agreementText: string;
  smartContractId: string;
  agreementTitle: string;
  signature: string;
}): Promise<void> {
  const supabase = createClient();

  // 1) Turn off waitlist
  const { error: updateOfferingError } = await supabase
    .from("offering")
    .update({ waitlist_on: false })
    .eq("id", offeringId);
  if (updateOfferingError) throw updateOfferingError;

  // 2) Insert smart contract set
  const { error: scError } = await supabase
    .from("offering_smart_contract_set")
    .insert({ offering_id: offeringId, share_contract_id: smartContractId });
  if (scError) throw scError;

  // 3) Insert document
  const { error: docError } = await supabase.from("document").insert({
    title: agreementTitle,
    text: agreementText,
    date: currentDate,
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
}): Promise<{
  records: any[];
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("offering_participant")
    .select("id, name, offering(*)")
    .ilike("wallet_address", walletAddress);
  if (error) throw error;
  return { records: data ?? [] };
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
  offeringId: string;
  offeringEntityId: string;
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
    offering_id: offeringId,
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
      owner_id: offeringEntityId,
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

export async function addWhitelistMember({
  addressOfferingId,
  walletAddress,
  chainId,
  name,
  offering,
  externalId,
  transactionHash,
  type,
}: {
  addressOfferingId: string;
  walletAddress: string;
  chainId: number;
  name?: string | null;
  offering: string;
  externalId?: string | null;
  transactionHash?: string | null;
  type: string;
}): Promise<void> {
  const supabase = createClient();

  const { data: participant, error: pErr } = await supabase
    .from("offering_participant")
    .insert({
      address_offering_id: addressOfferingId,
      wallet_address: walletAddress,
      chain_id: chainId,
      name: name ?? null,
      offering_id: offering,
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

  revalidatePath("/", "page");
}

export async function updateWhitelist({
  participantId,
  transactionHash,
  type,
}: {
  participantId: string;
  transactionHash: string;
  type: string;
}): Promise<{
  affectedCount: number;
  records: { id: string; transaction_hash: string; type: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("whitelist_transaction")
    .update({ transaction_hash: transactionHash, type })
    .eq("offering_participant_id", participantId)
    .select("id, transaction_hash, type");
  if (error) throw error;
  revalidatePath("/", "page");
  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as any,
  };
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
      { offering_id: offeringId, title, text, section, order },
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
