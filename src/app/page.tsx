import styled from 'styled-components';
import {
  Container,
  SkeletonBtn,
  SkeletonImg,
  SkeletonInner,
  SkeletonLineOne,
  SkeletonLineTwo
} from '@/styles/global';
import { useState } from 'react';
import products from '@/memory/transactions.json';
import Link from 'next/link';
import { getProducts } from '@/use-cases/get-products';
const Skeleton = () => (
  <SkeletonInner>
    <SkeletonImg />
    <SkeletonBtn />
    <SkeletonLineOne />
    <SkeletonLineTwo />
  </SkeletonInner>
);

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10;

  // const [after, setAfter] = useState(10)
  const howMany = () => {
    const count = {};

    products
      .map((value) => value.account)
      .forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
      });
    console.log(count);
  };

  // const getAll = () => {
  //   const page_size = 10;
  //   const page_number = page || 1;
  //   return Object.values(products).slice(
  //     (page_number - 1) * page_size,
  //     page_number * page_size
  //   );
  // };
  return (
    <div className="space-y-4">
      {/*<h1 className="text-xl font-medium text-gray-400/80">*/}
      {/*  Styled with Styled Components*/}
      {/*</h1>*/}
      {/*/!*{howMany()}*!/*/}
      {/*<Container>*/}
      {/*  <Skeleton />*/}
      {/*  <Skeleton />*/}
      {/*</Container>*/}
      {/*{howMany()}*/}
      {/*{getProducts({ page_number: page }).map((item, index) => (*/}
      {/*  <p key={index}>{item.amount}</p>*/}
      {/*))}*/}

      {/*<p>*/}
      {/*  deposit:{' '}*/}
      {/*  {products.filter((filt) => filt.transaction_type === 'deposit').length}*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*  withdraw:{' '}*/}
      {/*  {products.filter((filt) => filt.transaction_type === 'withdraw').length}*/}
      {/*</p>*/}
      {/*/!*<button onClick={() => setAfter(after - 10)}>previous</button>*!/*/}
      {/*<Link*/}
      {/*  href={{*/}
      {/*    pathname: '/',*/}
      {/*    query: {*/}
      {/*      page: page > 1 ? page - 1 : 1*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"*/}
      {/*>*/}
      {/*  Prev*/}
      {/*</Link>*/}
      {/*<Link*/}
      {/*  href={{*/}
      {/*    pathname: '/',*/}
      {/*    query: {*/}
      {/*      page: page + 1*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"*/}
      {/*>*/}
      {/*  Next*/}
      {/*</Link>*/}
    </div>
  );
};

export default Page;
