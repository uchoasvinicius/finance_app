import products from '@/memory/transactions.json';

export const getFilterList = (filter: string | any) => {
  const filterValues = Object.values(products).map((value) => value[filter]);

  return [...new Set(filterValues)];
};
