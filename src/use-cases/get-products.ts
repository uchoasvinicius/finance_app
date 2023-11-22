import products from '@/memory/transactions.json';
import { Products } from '@/types/products';

interface GetProducts {
  page_number: number;
  filters?: {
    search?: string;
    account?: string;
    state?: string;
    transaction_type?: string;
    industry?: string;
  };
}

const isObjectEmpty = (objectName: any) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

const page_size = 10; // Limit for pagination
export const getProducts = ({
  page_number,
  filters
}: GetProducts): Products[] => {
  const transactions = Object.values(products)
    .filter((value) =>
      filters?.account ? value.account === filters.account : value
    )
    .filter((value) =>
      filters?.transaction_type
        ? value.transaction_type === filters.transaction_type
        : value
    )
    .filter((value) => (filters?.state ? value.state === filters.state : value))
    .filter((value) =>
      filters?.industry ? value.industry === filters.industry : value
    )
    .slice((page_number - 1) * page_size, page_number * page_size);

  return transactions;
};
