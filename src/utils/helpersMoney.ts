import { Offering, OfferingSale } from 'types';

export function priceCalculator(maxRaise: number, units: number, display?: boolean) {
  const baseAmount = maxRaise / units;
  return display ? numberWithCommas(baseAmount) : parseInt((baseAmount * 100).toFixed(0), 10);
}

export function numberWithCommas(amount: number, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function getSalesByPrice(sales: OfferingSale[]) {
  const arrayForSort = sales && [...sales];
  return arrayForSort?.sort((a: OfferingSale, b: OfferingSale) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
}

export function getLowestSalePrice(sales: OfferingSale[], priceStart: number) {
  const salesByPrice = getSalesByPrice(sales);
  return salesByPrice?.length > 0 ? salesByPrice[0].price : priceStart;
}

export const getCurrentSalePrice = (offering: Offering) => {
  return getLowestSalePrice(offering.sales, offering.details.priceStart);
};

export const TotalCreditsWithValue = (ccPayments) => {
  let creditsReceived = 0;
  let totalWorth = 0;
  if (ccPayments) {
    ccPayments.map((payment) => {
      creditsReceived += payment.amount;
      totalWorth += payment.amount * payment.currency.contributorCreditClass.currentFunding;
    });

    return { creditsReceived, totalWorth };
  }
  return;
};

export const AddFinancialInvestmentsAmount = (investments) => {
  let totalAmount = 0;
  investments?.map((investment) => (totalAmount += investment.amount));
  return totalAmount;
};
