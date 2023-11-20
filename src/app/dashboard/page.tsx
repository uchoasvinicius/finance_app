import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import useScript from './useScript';
import Sidebar from './components/sidebar';
import OrderTable from './components/order-table';
import OrderList from './components/order-list';
import Header from './components/header';
import React from 'react';
import HeroCard from '@/app/dashboard/components/hero-card';
import { getProducts } from '@/use-cases/get-products';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

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
  const transaction =
    typeof searchParams.transaction === 'string'
      ? searchParams.transaction
      : 'deposit';

  const products = () => {
    const filters = {
      search,
      account,
      state,
      transaction
    };
    return getProducts({ page_number: page, filters });
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />

        <Box
          component="main"
          className="MainContent"
          sx={{
            px: {
              xs: 2,
              md: 6
            },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Orders
              </Typography>
            </Breadcrumbs>
          </Box>
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
            <Typography level="h2">Products</Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button>
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
            <HeroCard />
            <HeroCard />
            <HeroCard />
          </Box>
          <OrderTable page={page} rows={products()} />
          <OrderList />
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default Page;
