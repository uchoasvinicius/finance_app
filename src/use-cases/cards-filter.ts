import products from '@/memory/transactions.json';
interface AmountValue {
  transaction: string;
}
export function sumAmountValues({ transaction }: AmountValue): number {
  const filterValues = Object.values(products).filter(
    (value) => value.transaction_type === transaction
  );

  return filterValues.reduce((sum, transaction) => {
    // Convert amount to number before adding to the sum
    const amountValue = parseFloat(transaction.amount) || 0;
    return sum + amountValue;
  }, 0);
}
