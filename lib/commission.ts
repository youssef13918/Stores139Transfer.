export function calculateCommission(amount: number): number {
  if (amount <= 0) return 0
  if (amount <= 10) return 0.35
  if (amount <= 20) return 0.3
  if (amount <= 30) return 0.25
  return 0.2
}

export function calculateNetAmount(
  amount: number,
  wldPrice: number,
): {
  commission: number
  commissionPercentage: number
  netAmount: number
} {
  const commissionPercentage = calculateCommission(amount)
  const commission = amount * commissionPercentage
  const netAmount = (amount - commission) * wldPrice

  return {
    commission,
    commissionPercentage,
    netAmount,
  }
}
