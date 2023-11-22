import products from '@/memory/transactions.json';
import { Products } from '@/types/products';
const listTransactions: Products[] = products;
export function GetIndustriesAmount() {
  const industries = Array.from(
    new Set(listTransactions.map((entry) => entry.industry))
  );

  const result = Object.entries(
    listTransactions.reduce((acc: any, entry) => {
      // Extract year from the date field
      const year = new Date(entry.date).getFullYear();

      // Create a nested object structure for industry and amount
      acc[year] = acc[year] || {};
      acc[year][entry.industry] =
        (acc[year][entry.industry] || 0) + parseFloat(entry.amount);

      return acc;
    }, {})
  ).map(([year, industryData]) => {
    const row = [year];

    // Dynamically generate rows for all industries
    industries.forEach((industry) => {
      row.push(industryData[industry] || 0);
    });

    return row;
  });

  const headerRow = ['Year', ...industries];
  result.unshift(headerRow);

  return result;
}
