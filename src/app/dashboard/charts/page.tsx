'use client';
import React from 'react';
import { Chart } from 'react-google-charts';
import products from '@/memory/transactions.json';
import { GetTransactionsAmount } from '@/use-cases/charts/get-transactions-amount';
import { GetIndustriesAmount } from '@/use-cases/charts/get-industries-amount';
import { Products } from '@/types/products';
import Box from '@mui/joy/Box';
const listTransactions: Products[] = products;

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
    <Box>
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
  );
};

export default Page;
