export const getIsAllowanceSufficient = (allowance: number | undefined, amountRequiredForAction: number) =>
  allowance ? allowance >= amountRequiredForAction : false;
