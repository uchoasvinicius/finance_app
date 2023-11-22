import products from '@/memory/transactions.json';
import { Products } from '@/types/products';

export function GetTransactionsAmount() {
  const listTransactions: Products[] = products;

  const transactionsChart: (string | number)[][] = Object.entries(
    listTransactions.reduce((acc: any, entry) => {
      // Extract year from the date field
      const year = new Date(entry.date).getFullYear();

      // Create a nested object structure for transaction_type and amount
      acc[year] = acc[year] || {};
      acc[year][entry.transaction_type] =
        (acc[year][entry.transaction_type] || 0) + parseFloat(entry.amount);

      return acc;
    }, {})
  ).map(([year, types]) => {
    const row: (string | number)[] = [year];
    row.push(types['withdraw'] || 0);
    row.push(types['deposit'] || 0);
    return row;
  });

  return [['Year', 'Withdraw', 'Deposit'], ...transactionsChart];
}
