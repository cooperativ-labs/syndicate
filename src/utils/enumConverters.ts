import { String0x } from "@src/web3/helpersChain";
import {
  CurrencyCode,
  DistributionPeriodType,
  DocumentFormat,
  LinkedAccountType,
  NotificationSubject,
  OfferingTabSection,
  OfferingType,
  OrganizationPermissionType,
  OrganizationUserPermission,
  RealEstatePropertyType,
} from "@/types";

// ===== PROFILE ======
export const tabSectionOptions = [
  { value: OfferingTabSection.DETAILS, name: "Details" },
  { value: OfferingTabSection.FINANCIALS, name: "Financials" },
  { value: OfferingTabSection.TERMS, name: "Terms" },
  { value: OfferingTabSection.OFFEROR_INFO, name: "The Offeror" },
  { value: OfferingTabSection.DISCLOSURES, name: "Disclosures" },
];

export const getTabSectionOption = (
  desiredSectionValue: keyof typeof OfferingTabSection,
) => {
  return tabSectionOptions.find(
    (option) => (option.value === desiredSectionValue ? option : null),
  );
};

export const socialAccountOptions = [
  { value: LinkedAccountType.LINKEDIN, name: "LinkedIn", icon: "linkedin" },
  { value: LinkedAccountType.GITHUB, name: "Github", icon: "github" },
  { value: LinkedAccountType.DRIBBBLE, name: "Dribbble", icon: "dribbble" },
  { value: LinkedAccountType.DISCORD, name: "Discord", icon: "discord" },
  { value: LinkedAccountType.YOUTUBE, name: "Youtube", icon: "youtube" },
  {
    value: LinkedAccountType.SOUNDCLOUD,
    name: "SoundCloud",
    icon: "soundcloud",
  },
  { value: LinkedAccountType.TWITTER, name: "Twitter", icon: "twitter" },
  { value: LinkedAccountType.FACEBOOK, name: "Facebook", icon: "facebook" },
  { value: LinkedAccountType.INSTAGRAM, name: "Instagram", icon: "instagram" },
  { value: LinkedAccountType.MEDIUM, name: "Medium", icon: "medium" },
  { value: LinkedAccountType.SUBSTACK, name: "Substack", icon: "" },
  { value: LinkedAccountType.MIRROR, name: "Mirror", icon: "" },
  { value: LinkedAccountType.TELEGRAM, name: "Telegram", icon: "telegram" },
  { value: LinkedAccountType.EMAIL, name: "Email", icon: "envelope" },
  { value: LinkedAccountType.PHONE, name: "Phone", icon: "phone" },
  { value: LinkedAccountType.WEBSITE, name: "Website", icon: "link" },
  { value: LinkedAccountType.OTHER, name: "Other", icon: "" },
];
export const getSocialAccountOption = (
  type: keyof typeof LinkedAccountType | null | undefined,
) => {
  const option = socialAccountOptions.find(
    (account) => (account.value === type ? type : null),
  );
  return option;
};

export const organizationPermissionOptions = [
  { value: OrganizationPermissionType.ADMIN, name: "Admin", color: "blue-500" },
  {
    value: OrganizationPermissionType.EDITOR,
    name: "Editor",
    color: "emerald-600",
  },
  {
    value: OrganizationPermissionType.VIEWER,
    name: "Viewer",
    color: "orange-600",
  },
  {
    value: OrganizationPermissionType.AUDITOR,
    name: "Auditor",
    color: "gray-500",
  },
];

export const getOrganizationPermissionOption = (
  permission: OrganizationUserPermission,
): { value: OrganizationUserPermission; name: string; color: string } => {
  const defaultOption = {
    value: OrganizationPermissionType.VIEWER, // Set the default value as needed
    name: "Not Found",
    color: "#000000",
  };
  const option = organizationPermissionOptions.find((option) => {
    return option.value === permission ? option : null;
  });

  return option || defaultOption;
};

export const notificationSubjectOptions = [
  {
    value: NotificationSubject.OFFERING_DISTRIBUTION,
    name: "Distribution Submitted",
  },
  { value: NotificationSubject.PROCEEDS_CLAIM, name: "Proceeds Claimed" },
  {
    value: NotificationSubject.TRANSACTION_REQUEST,
    name: "Transaction Approval Requested",
  },
  { value: NotificationSubject.TRADE_EXECUTION, name: "Trade Executed" },
  { value: NotificationSubject.WHITELIST_APPROVAL, name: "Investor Added" },
];

export const getNotificationSubjectOption = (
  notificationSubject: keyof typeof NotificationSubject,
) => {
  const option = notificationSubjectOptions.find((option) => {
    return option.value === notificationSubject ? option : null;
  });
  return option;
};

// ===== ENTITY ======

export enum LegalEntityType {
  Individual = "INDIVIDUAL",
  Llc = "LLC",
  Corporation = "CORPORATION",
}
export const entityTypeOptions = [
  { value: LegalEntityType.Individual, name: "Individual" },
  { value: LegalEntityType.Llc, name: "LLC" },
  { value: LegalEntityType.Corporation, name: "Corporation" },
];

export const getEntityTypeOptions = (nonHuman: boolean) => {
  if (nonHuman) {
    return entityTypeOptions.filter((option) =>
      option.value !== LegalEntityType.Individual
    );
  }
  return [{ value: LegalEntityType.Individual, name: "Individual" }];
};

export const docFormatOptions = [
  { value: DocumentFormat.GOOGLE_DOC, name: "Google Doc" },
  {
    value: DocumentFormat.GOOGLE_DRIVE,
    name: "Google Drive",
    icon: "google-drive",
    subtitle: "Google Drive",
  },
  {
    value: DocumentFormat.GOOGLE_SHEET,
    name: "Google Sheet",
    icon: "google-drive",
    subtitle: "Google Drive",
  },
  {
    value: DocumentFormat.GOOGLE_SLIDE,
    name: "Google Slide",
    icon: "google-drive",
    subtitle: "Google Drive",
  },
  {
    value: DocumentFormat.NOTION,
    name: "Notion Page",
    icon: "file-alt",
    subtitle: "Notion Page",
  },
  { value: DocumentFormat.PDF, name: "PDF", icon: "file-pdf", subtitle: "PDF" },
  {
    value: DocumentFormat.GITHUB,
    name: "Github",
    icon: "github",
    subtitle: "Github",
  },
  {
    value: DocumentFormat.EXCEL,
    name: "Excel",
    icon: "file-excel",
    subtitle: "Excel",
    ending: "xlsx",
  },
  {
    value: DocumentFormat.POWERPOINT,
    name: "Powerpoint",
    icon: "file-powerpoint",
    subtitle: "Powerpoint",
  },
  {
    value: DocumentFormat.WORD_DOC,
    name: "Word",
    icon: "file-word",
    subtitle: "Word",
  },
  {
    value: DocumentFormat.VIDEO,
    name: "Video",
    icon: "play",
    subtitle: "Video",
  },
  {
    value: DocumentFormat.OTHER,
    name: "Other",
    icon: "file-alt",
    subtitle: "Document",
  },
  {
    value: DocumentFormat.MARKDOWN,
    name: "Markdown",
    icon: "file-alt",
    subtitle: "Markdown",
  },
];

export const getDocFormatOption = (
  type: keyof typeof DocumentFormat | undefined,
) => {
  return docFormatOptions.find((option) => option.value === type);
};
// ===== OFFERING ======
export const distributionPeriodOptions = [
  { value: DistributionPeriodType.DAY, name: "Day" },
  { value: DistributionPeriodType.WEEK, name: "Week" },
  { value: DistributionPeriodType.MONTH, name: "Month" },
  { value: DistributionPeriodType.QUARTER, name: "Quarter" },
  { value: DistributionPeriodType.YEAR, name: "Year" },
  // { value: DistributionPeriodType.Described, name: 'Described' },
  // { value: DistributionPeriodType.Unspecified, name: 'Unspecified' },
  // { value: DistributionPeriodType.None, name: 'None' },
];

export const getDistributionPeriod = (
  period: keyof typeof DistributionPeriodType,
) => {
  const option = distributionPeriodOptions.find(
    (per) => (per.value === period ? per : null),
  );
  return option?.name;
};

// ===== ASSETS ======

export const investmentOfferingTypeOptions = [
  {
    value: OfferingType.REAL_ESTATE,
    name: "Real Estate",
  },
  {
    value: OfferingType.CRYPTO,
    name: "Crypto",
  },
  {
    value: OfferingType.PRIVATE_EQUITY,
    name: "Private Equity",
  },
  {
    value: OfferingType.VENTURE_CAPITAL,
    name: "Venture Capital",
  },
  {
    value: OfferingType.OTHER,
    name: "Other",
  },
];

export const propertyTypeOptions = [
  { value: RealEstatePropertyType.SINGLE_FAMILY, name: "Single-family" },
  { value: RealEstatePropertyType.MULTI_FAMILY, name: "Multi-family" },
  { value: RealEstatePropertyType.COMMERCIAL, name: "Commercial" },
  { value: RealEstatePropertyType.LAND_ONLY, name: "Vacant land" },
  { value: RealEstatePropertyType.SELF_STORAGE, name: "Self-storage" },
];

export const getPropertyTypeOption = (
  inputValue: keyof typeof RealEstatePropertyType,
) => {
  return propertyTypeOptions.find(
    (option) => (option.value === inputValue ? option : null),
  );
};

export enum AssetStatus {
  Identified = "IDENTIFIED",
  InNegotiation = "IN_NEGOTIATION",
  DueDiligence = "DUE_DILIGENCE",
  UnderContract = "UNDER_CONTRACT",
  Closed = "CLOSED",
  ForSale = "FOR_SALE",
}

export const assetStatusOptions = [
  { value: AssetStatus.Identified, name: "Identified", width: "20%" },
  { value: AssetStatus.InNegotiation, name: "In negotiation", width: "35%" },
  { value: AssetStatus.DueDiligence, name: "In due diligence", width: "65%" },
  { value: AssetStatus.UnderContract, name: "Under Contract", width: "80%" },
  { value: AssetStatus.Closed, name: "Closed", width: "100%" },
  { value: AssetStatus.ForSale, name: "For sale", width: "20%" },
];

export enum OfferingStage {
  Identified = "IDENTIFIED",
  InNegotiation = "IN_NEGOTIATION",
  DueDiligence = "DUE_DILIGENCE",
  Sale = "SALE",
  Locked = "LOCKED",
  Closed = "CLOSED",
}
export const getAssetStatusOption = (
  inputValue: OfferingStage | AssetStatus | undefined,
) => {
  return assetStatusOptions.find(
    (option) => (option.value === inputValue ? option : null),
  );
};

export const StageOptions = [
  { value: OfferingStage.Identified, name: "Identified", width: "20%" },
  { value: OfferingStage.InNegotiation, name: "In negotiation", width: "35%" },
  { value: OfferingStage.DueDiligence, name: "Due diligence", width: "50%" },
  { value: OfferingStage.Sale, name: "Shares on sale", width: "65%" },
  { value: OfferingStage.Locked, name: "Trading locked", width: "80%" },
  { value: OfferingStage.Closed, name: "Closed", width: "100%" },
];
export const getStageOption = (stage: OfferingStage) => {
  return StageOptions.find((st) => (st.value === stage ? st : null));
};

type SwapStatusOptionProps = {
  isAccepted: boolean | undefined;
  isApproved: boolean | undefined;
  isFilled: boolean | undefined;
  isCancelled: boolean | undefined;
  amount: number | undefined;
  filledAmount: number | undefined;
  isFiller: boolean | undefined;
  txnApprovalsEnabled: boolean | undefined;
  swapApprovalsEnabled: boolean | undefined;
  isVisible: boolean | undefined;
};

export const getSwapStatusOption = ({
  isAccepted,
  isApproved,
  isFilled,
  isCancelled,
  isVisible,
  amount,
  filledAmount,
  isFiller,
  txnApprovalsEnabled,
  swapApprovalsEnabled,
}: SwapStatusOptionProps) => {
  const disapproved = false; // needs logic from DB
  const cancelled = isCancelled && !isFilled;
  const fullyFilled = filledAmount === amount;
  const error = isCancelled && isFilled;
  const ended = fullyFilled || cancelled || disapproved;

  const awaitingListingApproval =
    (swapApprovalsEnabled && txnApprovalsEnabled && !isVisible && !isApproved &&
      !ended) ||
    (swapApprovalsEnabled && !txnApprovalsEnabled && !isApproved && !ended);
  const awaitingTxnApproval = txnApprovalsEnabled && isAccepted &&
    !isApproved && !ended;
  const awaitingExecution = txnApprovalsEnabled && isApproved && isFiller &&
    !ended;
  const filledLessThanAmount = filledAmount && amount
    ? filledAmount < amount
    : false && !ended;
  const partiallyFilled = filledAmount && filledAmount > 0 &&
    filledLessThanAmount && !ended;

  switch (true) {
    case error:
      return { value: "error", name: "error", color: "red-800" };
    // case disapproved:
    //   return { value: 'disapproved', name: 'disapproved', color: 'red-800' };
    case cancelled:
      return { value: "cancelled", name: "cancelled", color: "gray-600" };
    case fullyFilled:
      return { value: "complete", name: "complete", color: "blue-600" };
    case awaitingListingApproval:
      return {
        value: "initiated",
        name: "listing requested",
        color: "orange-600",
      };
    case awaitingTxnApproval:
      return {
        value: "pending",
        name: "trade approval requested",
        color: "orange-600",
      };
    case awaitingExecution:
      return { value: "pending", name: "trade pending", color: "orange-600" };
    case partiallyFilled:
      return { value: "partiallyFilled", name: "live", color: "green-600" };

    default:
      return { value: "approved", name: "live", color: "green-600" };
  }
};

// ===== Trades =====
export enum ShareTransferEventType {
  Trade = "TRADE",
  Issuance = "ISSUANCE",
  Forced = "FORCED",
  Transfer = "TRANSFER",
  Disapproval = "DISAPPROVAL",
  Approval = "APPROVAL",
}

export const TransferEventOptions = [
  { value: ShareTransferEventType.Trade, name: "Trade", color: "Purple-600" },
  {
    value: ShareTransferEventType.Issuance,
    name: "Issuance",
    color: "blue-600",
  },
  { value: ShareTransferEventType.Forced, name: "Forced", color: "red-600" },
  { value: ShareTransferEventType.Transfer, name: "Transfer", color: "black" },
  {
    value: ShareTransferEventType.Disapproval,
    name: "Disapproval",
    color: "red-600",
  },
  {
    value: ShareTransferEventType.Approval,
    name: "Approval",
    color: "green-600",
  },
];

export const getTransferEventOption = (tradeType: ShareTransferEventType) => {
  return TransferEventOptions.find(
    (option) => (option.value === tradeType ? option : null),
  );
};

// ===== CURRENCY =====

export enum CurrencyType {
  COOP = "COOP",
  FIAT = "FIAT",
  CRYP = "CRYP",
}

export enum CryptoAddressProtocol {
  Btc = "BTC",
  Eth = "ETH",
  Ada = "ADA",
  Matic = "MATIC",
}

export const currencyOptions = [
  {
    type: CurrencyType.COOP,
    value: CurrencyCode.CC,
    symbol: "Contributor Credits",
  },
  {
    type: CurrencyType.FIAT,
    value: CurrencyCode.USD,
    symbol: "USD",
    decimals: 2,
  },
  {
    type: CurrencyType.FIAT,
    value: CurrencyCode.EUR,
    symbol: "EUR",
    decimals: 2,
  },
  {
    type: CurrencyType.FIAT,
    value: CurrencyCode.GBP,
    symbol: "GBP",
    decimals: 2,
  },
  {
    type: CurrencyType.FIAT,
    value: CurrencyCode.CAD,
    symbol: "CAD",
    decimals: 2,
  },
  {
    type: CurrencyType.FIAT,
    value: CurrencyCode.AUD,
    symbol: "AUD",
    decimals: 2,
  },
  {
    type: CurrencyType.FIAT,
    value: CurrencyCode.KYD,
    symbol: "KYD",
    decimals: 2,
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.BTC,
    symbol: "BTC",
    protocol: CryptoAddressProtocol.Btc,
    chainId: 1,
    decimals: 8,
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.ETH,
    symbol: "ETH",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
    decimals: 18,
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.ADA,
    symbol: "ADA",
    protocol: CryptoAddressProtocol.Ada,
    chainId: 1,
    decimals: 18,
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.MATIC,
    symbol: "MATIC",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.USDC,
    symbol: "USDC",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    website: "https://www.centre.io/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
    decimals: 6,
    logo:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.DAI,
    symbol: "DAI",
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    website: "https://makerdao.com/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
    decimals: 18,
    logo:
      "https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.PoS_USDC,
    symbol: "Matic USDC",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    website: "https://www.centre.io/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
    logo:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.PoS_DAI,
    symbol: "Matic DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    website: "https://makerdao.com/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.USDC_TEST_,
    symbol: "USDC*",
    address: "0x66458Bb9BF8e09eA40cf916BCb370727455F6040",
    website: "https://www.centre.io/",
    protocol: CryptoAddressProtocol.Eth,
    decimals: 6,
    chainId: 11155111,
    logo:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.DAI_TEST_,
    symbol: "DAI*",
    address: "0x3aa3DAd8008288CB5F9dc2F6e1e6213035ddBE88",
    website: "https://makerdao.com/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 11155111,
    decimals: 18,
    logo:
      "https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.USDC_MATIC_TEST_,
    symbol: "Matic USDC*",
    address: "NEED ADDRESS",
    website: "https://www.centre.io/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80001,
    decimals: 18,
    logo:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  },
  {
    type: CurrencyType.CRYP,
    value: CurrencyCode.DAI_MATIC_TEST_,
    symbol: "Matic DAI*",
    address: "NEED ADDRESS",
    website: "https://makerdao.com/",
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80001,
    decimals: 18,
    logo:
      "https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774",
  },
];

export const bacOptions = currencyOptions.filter(
  (option) =>
    (option.type === CurrencyType.CRYP &&
      option.protocol === CryptoAddressProtocol.Eth) ||
    option.protocol === CryptoAddressProtocol.Matic,
);

export const fiatOptions = currencyOptions.filter((option) =>
  option.type === CurrencyType.FIAT
);

export const currencyOptionsExcludeCredits = currencyOptions.filter(
  (option) => option.type !== CurrencyType.COOP && option.chainId !== 3,
);

export const getCurrencyOption = (
  currency: keyof typeof CurrencyCode | undefined,
) => {
  return currencyOptions.find((cur) => (cur.value === currency ? cur : null));
};
export const getCurrencyByCode = (
  currencyCode: keyof typeof CurrencyCode | undefined,
) => {
  return currencyOptions.find(
    (cur) => (cur.value === currencyCode ? cur : null),
  );
};

export const getCurrencyById = (id: String0x | undefined) => {
  if (!id) return null;
  return currencyOptions.find((cur) => (cur.address === id ? cur : null));
};

// export const getCurrencyBySymbol = (symbol) => {
//   return currencyOptions.find((cur) => (cur.symbol === symbol ? cur : null));
// };

// ===== MISC ======

export const severityOptions = [
  { value: null, name: "Need rank" },
  { value: 10, name: "1 - not critical" },
  { value: 20, name: "2" },
  { value: 30, name: "3" },
  { value: 40, name: "4" },
  { value: 50, name: "5 - very critical" },
];
