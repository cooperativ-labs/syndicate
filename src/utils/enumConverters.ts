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
} from 'types';

// ===== PROFILE ======

export const tabSectionOptions = [
  { value: OfferingTabSection.Details, name: 'Details' },
  { value: OfferingTabSection.Financials, name: 'Financials' },
  { value: OfferingTabSection.Terms, name: 'Terms' },
  { value: OfferingTabSection.OfferorInfo, name: 'The Offeror' },
  { value: OfferingTabSection.Disclosures, name: 'Disclosures' },
];

export const getTabSectionOption = (desiredSectionValue) => {
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
export const getSocialAccountOption = (type: LinkedAccountType) => {
  const option = socialAccountOptions.find((account) => (account.value === type ? type : null));
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

export const organizationPermissionOptions = [
  { value: OrganizationPermissionType.Admin, name: 'Admin', color: 'blue-500' },
  { value: OrganizationPermissionType.Editor, name: 'Editor', color: 'emerald-600' },
  { value: OrganizationPermissionType.Viewer, name: 'Viewer', color: 'orange-600' },
  { value: OrganizationPermissionType.Auditor, name: 'Auditor', color: 'gray-500' },
];

export const getOrganizationPermissionOption = (permission: OrganizationPermissionType) => {
  return organizationPermissionOptions.find((option) => (option.value === permission ? option : null));
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

export const getDocFormatOption = (type: DocumentFormat) => {
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

export const getDistributionPeriod = (period) => {
  const option = distributionPeriodOptions.find((per) => (per.value === period ? per : null));
  return option.name;
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

export const getPropertyTypeOption = (inputValue) => {
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

export const getAssetStatusOption = (inputValue) => {
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
export const getStageOption = (stage) => {
  return StageOptions.find((st) => (st.value === stage ? st : null));
};

export type SaleStatusType = 'initd' | 'partl' | 'apprv' | '-----' | 'compl';

export const SaleStatusOptions = [
  { value: 'initd', name: 'requires approval', color: 'orange-600' },
  { value: 'partl', name: 'live', color: 'green-600' },
  { value: 'apprv', name: 'live', color: 'green-600' },
  { value: '-----', name: 'ended', color: 'gray-600' },
  { value: 'compl', name: 'complete', color: 'gray-600' },
];

export const getSaleStatusOption = (status) => {
  return SaleStatusOptions.find((st) => (st.value === status ? st : null));
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
    value: CurrencyCode.Ada,
    symbol: 'ADA',
    protocol: CryptoAddressProtocol.Ada,
    chainId: 1,
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.Matic,
    symbol: 'MATIC',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
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
    value: CurrencyCode.PoSUsdc,
    symbol: 'Matic USDC',
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
    symbol: 'Matic DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 137,
    decimals: 18,
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
    address: '0xfDdfE7C9Ba9649fB8943f9277830972aa6f3a6bB',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 3,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.UsdcMaticTest,
    symbol: 'Matic USDC*',
    address: 'NEED ADDRESS',
    website: 'https://www.centre.io/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80001,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.DaiMaticTest,
    symbol: 'Matic DAI*',
    address: 'NEED ADDRESS',
    website: 'https://makerdao.com/',
    protocol: CryptoAddressProtocol.Eth,
    chainId: 80001,
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/9956/large/dai-multi-collateral-mcd.png?1574218774',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.AlgoUsdc,
    symbol: 'USDC',
    address: '31566704',
    website: 'https://www.centre.io/usdc',
    protocol: CryptoAddressProtocol.Algo,
    chainId: 12345678,
    decimals: 6,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.AlgoUsdcTest,
    symbol: 'USDC',
    address: '91319595',
    website: 'https://www.centre.io/usdc',
    protocol: CryptoAddressProtocol.Algo,
    chainId: 654321,
    decimals: 6,
    logo: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  },
  {
    type: currencyType.CRYP,
    value: CurrencyCode.RealShare,
    symbol: 'SHARE',
    website: 'https://www.cooperativ.io',
    protocol: CryptoAddressProtocol.Algo,
    decimals: 6,
  },
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

export const getCurrencyOption = (currency) => {
  // console.log('getCurrencyOption', currency);
  return currencyOptions.find((cur) => (cur.value === currency?.code ? cur : null));
};

export const getCurrencyById = (id) => {
  return currencyOptions.find((cur) => (cur.address === id ? cur : null));
};

// export const getCurrencyBySymbol = (symbol) => {
//   return currencyOptions.find((cur) => (cur.symbol === symbol ? cur : null));
// };

// ===== MISC ======

export const seekingOptions = [
  { value: 'CO_FOUNDER', name: 'Co-Founder' },
  { value: 'CONTRIBUTORS', name: 'Contributors' },
  { value: 'INVESTMENT', name: 'Investment' },
];
export const getSeekingOption = (sought) => {
  const option = seekingOptions.find((seek) => (seek.value === sought ? sought : null));
  return option.name;
};

export const severityOptions = [
  { value: null, name: 'Need rank' },
  { value: 10, name: '1 - not critical' },
  { value: 20, name: '2' },
  { value: 30, name: '3' },
  { value: 40, name: '4' },
  { value: 50, name: '5 - very critical' },
];
