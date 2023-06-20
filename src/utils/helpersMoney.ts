export function priceCalculator(maxRaise: number, units: number, display?: boolean) {
  const baseAmount = maxRaise / units;
  return display ? numberWithCommas(baseAmount) : parseInt((baseAmount * 100).toFixed(0), 10);
}

export function numberWithCommas(amount: number | null | undefined, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function floatWithCommas(amount: string) {
  return amount ? amount.replace(/\B(?=(\d{3})+(?!\d)(?=\.\d{0,}$))/g, ',') : '0.00';
}
