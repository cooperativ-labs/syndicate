export function priceCalculator(maxRaise: number, units: number, display?: boolean) {
  const baseAmount = maxRaise / units;
  return display ? numberWithCommas(baseAmount) : parseInt((baseAmount * 100).toFixed(0), 10);
}

export function numberWithCommas(amount: number | null | undefined, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function floatWithCommas(amount: string, decimals = 2) {
  if (!amount) return '0.00';
  let floatAmount = parseFloat(amount).toFixed(decimals);
  return floatAmount.replace(/\B(?=(\d{3})+(?!\d)(?=\.\d{0,}$))/g, ',');
}
