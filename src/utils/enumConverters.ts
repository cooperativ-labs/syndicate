import { String0x } from '@src/web3/helpersChain';
import {
  CryptoAddressProtocol,
  CurrencyCode,
  DistributionPeriodType,
  OfferingDetailsType,
  AssetStatus,
  LegalEntityType,
  LinkedAccountType,
  RealEstatePropertyType,
  OfferingStage,
  DocumentFormat,
  OfferingTabSection,
  OrganizationPermissionType,
  ShareTransferEventType,
  Maybe,
  NotificationSubject,
} from 'types';

// ===== PROFILE ======

export const tabSectionOptions = [
  { value: OfferingTabSection.Details, name: 'Details' },
  { value: OfferingTabSection.Financials, name: 'Financials' },
  { value: OfferingTabSection.Terms, name: 'Terms' },
  { value: OfferingTabSection.OfferorInfo, name: 'The Offeror' },
  { value: OfferingTabSection.Disclosures, name: 'Disclosures' },
];

export const getTabSectionOption = (desiredSectionValue: OfferingTabSection) => {
  return tabSectionOptions.find((option) => (option.value === desiredSectionValue ? option : null));
};

export const socialAccountOptions = [
  { value: LinkedAccountType.Linkedin, name: 'LinkedIn', icon: 'linkedin' },
  { value: LinkedAccountType.Github, name: 'Github', icon: 'github' },
  { value: LinkedAccountType.Dribbble, name: 'Dribbble', icon: 'dribbble' },
  { value: LinkedAccountType.Discord, name: 'Discord', icon: 'discord' },
  { value: LinkedAccountType.Youtube, name: 'Youtube', icon: 'youtube' },
  { value: LinkedAccountType.Soundcloud, name: 'SoundCloud', icon: 'soundcloud' },
  { value: LinkedAccountType.Twitter, name: 'Twitter', icon: 'twitter' },
  { value: LinkedAccountType.Facebook, name: 'Facebook', icon: 'facebook' },
  { value: LinkedAccountType.Instagram, name: 'Instagram', icon: 'instagram' },
  { value: LinkedAccountType.Medium, name: 'Medium', icon: 'medium' },
  { value: LinkedAccountType.Substack, name: 'Substack', icon: '' },
  { value: LinkedAccountType.Mirror, name: 'Mirror', icon: '' },
  { value: LinkedAccountType.Telegram, name: 'Telegram', icon: 'telegram' },
  { value: LinkedAccountType.Email, name: 'Email', icon: 'envelope' },
  { value: LinkedAccountType.Phone, name: 'Phone', icon: 'phone' },
  { value: LinkedAccountType.Website, name: 'Website', icon: 'link' },
  { value: LinkedAccountType.Other, name: 'Other', icon: '' },
];
export const getSocialAccountOption = (type: LinkedAccountType | null | undefined) => {
  const option = socialAccountOptions.find((account) => (account.value === type ? type : null));
  return option;
};

export const organizationPermissionOptions = [
  { value: OrganizationPermissionType.Admin, name: 'Admin', color: 'blue-500' },
  { value: OrganizationPermissionType.Editor, name: 'Editor', color: 'emerald-600' },
  { value: OrganizationPermissionType.Viewer, name: 'Viewer', color: 'orange-600' },
  { value: OrganizationPermissionType.Auditor, name: 'Auditor', color: 'gray-500' },
];

export const getOrganizationPermissionOption = (
  permission: OrganizationPermissionType
): { value: OrganizationPermissionType; name: string; color: string } => {
  const defaultOption = {
    value: OrganizationPermissionType.Viewer, // Set the default value as needed
    name: 'Not Found',
    color: '#000000',
  };
  const option = organizationPermissionOptions.find((option) => {
    return option.value === permission ? option : null;
  });

  return option || defaultOption;
};

export const notificationSubjectOptions = [
  { value: NotificationSubject.OfferingDistribution, name: 'Distribution Submitted' },
  { value: NotificationSubject.ProceedsClaim, name: 'Proceeds Claimed' },
  { value: NotificationSubject.TransactionRequest, name: 'Transaction Approval Requested' },
  { value: NotificationSubject.TradeExecution, name: 'Trade Executed' },
  { value: NotificationSubject.WhitelistApproval, name: 'Investor Added' },
];

export const getNotificationSubjectOption = (notificationSubject: NotificationSubject) => {
  const option = notificationSubjectOptions.find((option) => {
    return option.value === notificationSubject ? option : null;
  });
  return option;
};

// ===== ENTITY ======

export const entityTypeOptions = [
  { value: LegalEntityType.Individual, name: 'Individual' },
  { value: LegalEntityType.Llc, name: 'LLC' },
  { value: LegalEntityType.Corporation, name: 'Corporation' },
];

export const getEntityTypeOptions = (nonHuman: boolean) => {
  if (nonHuman) {
    return entityTypeOptions.filter((option) => option.value !== LegalEntityType.Individual);
  }
  return [{ value: LegalEntityType.Individual, name: 'Individual' }];
};

export const docFormatOptions = [
  { value: DocumentFormat.GoogleDoc, name: 'Google Doc' },
  { value: DocumentFormat.GoogleDrive, name: 'Google Drive', icon: 'google-drive', subtitle: 'Google Drive' },
  { value: DocumentFormat.GoogleSheet, name: 'Google Sheet', icon: 'google-drive', subtitle: 'Google Drive' },
  { value: DocumentFormat.GoogleSlide, name: 'Google Slide', icon: 'google-drive', subtitle: 'Google Drive' },
  { value: DocumentFormat.Notion, name: 'Notion Page', icon: 'file-alt', subtitle: 'Notion Page' },
  { value: DocumentFormat.Pdf, name: 'PDF', icon: 'file-pdf', subtitle: 'PDF' },
  { value: DocumentFormat.Github, name: 'Github', icon: 'github', subtitle: 'Github' },
  {
    value: DocumentFormat.Excel,
    name: 'Excel',
    icon: 'file-excel',
    subtitle: 'Excel',
    ending: 'xlsx',
  },
  {
    value: DocumentFormat.Powerpoint,
    name: 'Powerpoint',
    icon: 'file-powerpoint',
    subtitle: 'Powerpoint',
  },
  { value: DocumentFormat.WordDoc, name: 'Word', icon: 'file-word', subtitle: 'Word' },
  { value: DocumentFormat.Video, name: 'Video', icon: 'play', subtitle: 'Video' },
  { value: DocumentFormat.Other, name: 'Other', icon: 'file-alt', subtitle: 'Document' },
  { value: DocumentFormat.Markdown, name: 'Markdown', icon: 'file-alt', subtitle: 'Markdown' },
];

export const getDocFormatOption = (type: Maybe<DocumentFormat> | undefined) => {
  return docFormatOptions.find((option) => option.value === type);
};

// ===== OFFERING ======

export const distributionPeriodOptions = [
  { value: DistributionPeriodType.Day, name: 'Day' },
  { value: DistributionPeriodType.Week, name: 'Week' },
  { value: DistributionPeriodType.Month, name: 'Month' },
  { value: DistributionPeriodType.Quarter, name: 'Quarter' },
  { value: DistributionPeriodType.Year, name: 'Year' },
  // { value: DistributionPeriodType.Described, name: 'Described' },
  // { value: DistributionPeriodType.Unspecified, name: 'Unspecified' },
  // { value: DistributionPeriodType.None, name: 'None' },
];

export const getDistributionPeriod = (period: DistributionPeriodType) => {
  const option = distributionPeriodOptions.find((per) => (per.value === period ? per : null));
  return option?.name;
};

// ===== ASSETS ======

export const investmentOfferingTypeOptions = [{ value: OfferingDetailsType.RealEstate, name: 'Real Estate' }];

export const propertyTypeOptions = [
  { value: RealEstatePropertyType.SingleFamily, name: 'Single-family' },
  { value: RealEstatePropertyType.MultiFamily, name: 'Multi-family' },
  { value: RealEstatePropertyType.Commercial, name: 'Commercial' },
  { value: RealEstatePropertyType.LandOnly, name: 'Vacant land' },
  { value: RealEstatePropertyType.SelfStorage, name: 'Self-storage' },
];

export const getPropertyTypeOption = (inputValue: RealEstatePropertyType) => {
  return propertyTypeOptions.find((option) => (option.value === inputValue ? option : null));
};

export const assetStatusOptions = [
  { value: AssetStatus.Identified, name: 'Identified', width: '20%' },
  { value: AssetStatus.InNegotiation, name: 'In negotiation', width: '35%' },
  { value: AssetStatus.DueDiligence, name: 'In due diligence', width: '65%' },
  { value: AssetStatus.UnderContract, name: 'Under Contract', width: '80%' },
  { value: AssetStatus.Closed, name: 'Closed', width: '100%' },
  { value: AssetStatus.ForSale, name: 'For sale', width: '20%' },
];

export const getAssetStatusOption = (inputValue: OfferingStage | Maybe<AssetStatus> | undefined) => {
  return assetStatusOptions.find((option) => (option.value === inputValue ? option : null));
};

export const StageOptions = [
  { value: OfferingStage.Identified, name: 'Identified', width: '20%' },
  { value: OfferingStage.InNegotiation, name: 'In negotiation', width: '35%' },
  { value: OfferingStage.DueDiligence, name: 'Due diligence', width: '50%' },
  { value: OfferingStage.Sale, name: 'Shares on sale', width: '65%' },
  { value: OfferingStage.Locked, name: 'Trading locked', width: '80%' },
  { value: OfferingStage.Closed, name: 'Closed', width: '100%' },
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
  isVisible: Maybe<boolean> | undefined;
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
    (swapApprovalsEnabled && txnApprovalsEnabled && !isVisible && !isApproved && !ended) ||
    (swapApprovalsEnabled && !txnApprovalsEnabled && !isApproved && !ended);
  const awaitingTxnApproval = txnApprovalsEnabled && isAccepted && !isApproved && !ended;
  const awaitingExecution = txnApprovalsEnabled && isApproved && isFiller && !ended;
  const filledLessThanAmount = filledAmount && amount ? filledAmount < amount : false && !ended;
  const partiallyFilled = filledAmount && filledAmount > 0 && filledLessThanAmount && !ended;

  switch (true) {
    case error:
      return { value: 'error', name: 'error', color: 'red-800' };
    // case disapproved:
    //   return { value: 'disapproved', name: 'disapproved', color: 'red-800' };
    case cancelled:
      return { value: 'cancelled', name: 'cancelled', color: 'gray-600' };
    case fullyFilled:
      return { value: 'complete', name: 'complete', color: 'blue-600' };
    case awaitingListingApproval:
      return { value: 'initiated', name: 'listing requested', color: 'orange-600' };
    case awaitingTxnApproval:
      return { value: 'pending', name: 'trade approval requested', color: 'orange-600' };
    case awaitingExecution:
      return { value: 'pending', name: 'trade pending', color: 'orange-600' };
    case partiallyFilled:
      return { value: 'partiallyFilled', name: 'live', color: 'green-600' };

    default:
      return { value: 'approved', name: 'live', color: 'green-600' };
  }
};

// ===== Trades =====

export const TransferEventOptions = [
  { value: ShareTransferEventType.Trade, name: 'Trade', color: 'Purple-600' },
  { value: ShareTransferEventType.Issuance, name: 'Issuance', color: 'blue-600' },
  { value: ShareTransferEventType.Forced, name: 'Forced', color: 'red-600' },
  { value: ShareTransferEventType.Transfer, name: 'Transfer', color: 'black' },
  { value: ShareTransferEventType.Disapproval, name: 'Disapproval', color: 'red-600' },
  { value: ShareTransferEventType.Approval, name: 'Approval', color: 'green-600' },
];

export const getTransferEventOption = (tradeType: ShareTransferEventType) => {
  return TransferEventOptions.find((option) => (option.value === tradeType ? option : null));
};

// ===== CURRENCY =====

export enum currencyType {
  FIAT,
  CRYP,
  COOP,
}
export const currencyOptions = [
  { type: currencyType.COOP, value: CurrencyCode.Cc, symbol: 'Contributor Credits' },
  { type: currencyType.FIAT, value: CurrencyCode.Usd, symbol: 'USD', decimals: 2 },
  { type: currencyType.FIAT, value: CurrencyCode.Eur, symbol: 'EUR', decimals: 2 },
  { type: currencyType.FIAT, value: CurrencyCode.Gbp, symbol: 'GBP', decimals: 2 },
  { type: currencyType.FIAT, value: CurrencyCode.Cad, symbol: 'CAD', decimals: 2 },
  { type: currencyType.FIAT, value: CurrencyCode.Aud, symbol: 'AUD', decimals: 2 },
  { type: currencyType.FIAT, value: CurrencyCode.Kyd, symbol: 'KYD', decimals: 2 },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.Btc,
    symbol: 'BTC',
    protocol: CryptoAddressProtocol.Btc,
    chainId: 1,
    decimals: 8,
  },
  //Mainnet
  {
    type: currencyType.CRYP,
    value: CurrencyCode.Eth,
    symbol: 'ETH',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.Usdc,
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
    decimals: 6,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.Dai,
    symbol: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 1,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.UsdcTest,
    symbol: 'USDC*',
    address: '0x66458Bb9BF8e09eA40cf916BCb370727455F6040',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    decimals: 6,
    chainId: 11155111,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.DaiTest,
    symbol: 'DAI*',
    address: '0x3aa3DAd8008288CB5F9dc2F6e1e6213035ddBE88',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 11155111,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  },

  //Polygon
  {
    type: currencyType.CRYP,
    value: CurrencyCode.Pol,
    symbol: 'POL',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  },

  {
    type: currencyType.CRYP,
    value: CurrencyCode.PoSUsdc,
    symbol: 'POS USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.PoSDai,
    symbol: 'POS DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.UsdcPolTest,
    symbol: 'Polygon USDC*',
    address: 'NEED ADDRESS',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80002,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.DaiPolTest,
    symbol: 'Polygon DAI*',
    address: 'NEED ADDRESS',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80002,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  },
  //Local Test
  {
    type: currencyType.CRYP,
    value: CurrencyCode.UsdcLocalTest,
    symbol: 'USDC*',
    address: '0x31060832eefce06cdd896c30e4d29054c8a34b06',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    decimals: 6,
    chainId: 1337,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  // {
  //   type: currencyType.CRYP,
  //   value: CurrencyCode.DaiLocalTest,
  //   symbol: 'DAI*',
  //   address: '0x3aa3DAd8008288CB5F9dc2F6e1e6213035ddBE88',
  //   website: 'https://makerdao.com/',
  //   protocol: CryptoAddressProtocol.Eth,
  //   chainId: 1337,
  //   decimals: 18,
  //   logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  // },
  // Base
  {
    type: currencyType.CRYP,
    value: CurrencyCode.BaseUsdc,
    symbol: 'Base USDC',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 8453,
    decimals: 6,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.BaseUsdcTest,
    symbol: 'Base USDC*',
    address: '0x0a18CA156E50CCaE322E6B791b4977a3CF06e8F3',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 84532,
    decimals: 6,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.BaseDaiTest,
    symbol: 'Base DAI*',
    address: '0xdAAfd8943D49BdEdEeaff55903290fA1Fc1897a3',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 84532,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  },
  // {
  //   type: currencyType.CRYP,
  //   value: CurrencyCode.Ada,
  //   symbol: 'ADA',
  //   protocol: CryptoAddressProtocol.Ada,
  //   chainId: 1,
  //   decimals: 18,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
  // },
];

export const bacOptions = currencyOptions.filter(
  (option) =>
    (option.type === currencyType.CRYP && option.protocol === CryptoAddressProtocol.Eth) ||
    option.protocol === CryptoAddressProtocol.Algo
);

export const fiatOptions = currencyOptions.filter((option) => option.type === currencyType.FIAT);

export const currencyOptionsExcludeCredits = currencyOptions.filter(
  (option) => option.type !== currencyType.COOP && option.chainId !== 3
);

export const getCurrencyOption = (currency: Maybe<CurrencyCode> | undefined) => {
  return currencyOptions.find((cur) => (cur.value === currency ? cur : null));
};
export const getCurrencyByCode = (currencyCode: Maybe<CurrencyCode> | undefined) => {
  return currencyOptions.find((cur) => (cur.value === currencyCode ? cur : null));
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
  { value: null, name: 'Need rank' },
  { value: 10, name: '1 - not critical' },
  { value: 20, name: '2' },
  { value: 30, name: '3' },
  { value: 40, name: '4' },
  { value: 50, name: '5 - very critical' },
];
