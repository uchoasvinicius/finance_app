'use client';
import React from 'react';
import { Chart } from 'react-google-charts';
import { GetTransactionsAmount } from '@/use-cases/charts/get-transactions-amount';
import { GetIndustriesAmount } from '@/use-cases/charts/get-industries-amount';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const Page = () => {
  const transactionsChart = GetTransactionsAmount();
  const industriesChart = GetIndustriesAmount();

  const chart_transactions = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Withdraws and Deposits'
    }
  };

  const chart_industries = {
    chart: {
      title: 'Industries Transactions',
      subtitle: 'Transactions sum by Company'
    }
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
        <Typography level="h2">Charts</Typography>
      </Box>
      <Box sx={{ overflowY: 'scroll', pr: 10 }}>
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={transactionsChart}
          options={chart_transactions}
        />
        <hr />
        <Chart
          chartType="Bar"
          width="100%"
          height="500px"
          data={industriesChart}
          options={chart_industries}
        />
      </Box>
    </>
  );
};

export default Page;
