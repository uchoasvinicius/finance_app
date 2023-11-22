import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Sidebar from './components/sidebar';
import OrderTable from './components/order-table';
import OrderList from './components/order-list';
import Header from './components/header';
import React from 'react';
import HeroCard from '@/app/dashboard/components/hero-card';
import { getProducts } from '@/use-cases/get-products';
import { sumAmountValues } from '@/use-cases/cards-filter';
import { formatCurrency } from '@/utils/money-convert';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import GraphArea from '@/app/dashboard/components/graph-area';

const Page = async ({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';
  const account =
    typeof searchParams.account === 'string' ? searchParams.account : '';
  const state =
    typeof searchParams.state === 'string' ? searchParams.state : '';
  const industry =
    typeof searchParams.industry === 'string' ? searchParams.industry : '';
  const transaction_type =
    typeof searchParams.transaction_type === 'string'
      ? searchParams.transaction_type
      : '';

  const products = () => {
    const filters = {
      search,
      account,
      state,
      transaction_type,
      industry
    };
    return getProducts({ page_number: page, filters });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          my: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        <Typography level="h2">Transactions</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          my: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap'
        }}
      >
        <HeroCard
          icon={<ArrowCircleDown />}
          text="Deposits"
          value={formatCurrency({
            value: sumAmountValues({ transaction: 'deposit' }).toString(),
            currency: 'BRL'
          })}
        />
        <HeroCard
          icon={<ArrowCircleUp />}
          text="Withdraws"
          value={formatCurrency({
            value: sumAmountValues({ transaction: 'withdraw' }).toString(),
            currency: 'BRL'
          })}
        />
      </Box>
      <OrderTable page={page} rows={products()} query={searchParams} />
      <OrderList />
    </>
  );
};

export default Page;
