import products from '@/memory/transactions.json';
import { Products } from '@/types/products';

interface GetProducts {
  page_number: number;
  filters?: {
    search?: string;
    account?: string;
    state?: string;
    transaction?: string;
  };
}

const page_size = 10; // Limit for pagination
export const getProducts = ({
  page_number,
  filters
}: GetProducts): Products[] => {
  return Object.values(products)
    .filter((value) =>
      filters?.account ? value.account === filters.account : value
    )
    .slice((page_number - 1) * page_size, page_number * page_size);
};
