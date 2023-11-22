'use client';

import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from 'next/link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
// icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { getFilterList } from '@/use-cases/filter-products';
import { getStateFullName } from '@/utils/get-states';
import { formatCurrency } from '@/utils/money-convert';
import { Products } from '@/types/products';

const generateLetters = (name: string) => {
  return name
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '')
    .slice(0, 2);
};

const convertDate = (date: number) => {
  const myDate = new Date(date);
  const formatDate =
    myDate.getDate() +
    '/' +
    myDate.toLocaleString('en-us', {
      month: 'short'
    }) +
    '/' +
    myDate.getFullYear() +
    ' ' +
    String(myDate.getHours()).padStart(2, '0') + // Ensure two digits for hours
    ':' +
    String(myDate.getMinutes()).padStart(2, '0'); // Ensure two digits for minutes

  return formatDate;
};

interface OrderTable {
  page: number;
  rows: Products[];
  filters?: {
    search?: string;
    account?: string;
    state?: string;
    transaction_type?: string;
    industry?: string;
  };
  query: any;
}

export default function OrderTable({ page, rows, query }: OrderTable) {
  // const [order, setOrder] = React.useState<Order>('desc');
  // const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Transaction</FormLabel>
        <Select
          defaultValue={query?.transaction_type}
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          {getFilterList('transaction_type').map((value) => (
            <Link
              key={value}
              passHref
              prefetch={false}
              href={{
                pathname: '/dashboard',
                query: {
                  ...query,
                  page: 1,
                  transaction_type: value
                }
              }}
              className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
            >
              <Option value={value}>{value}</Option>
            </Link>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Industry</FormLabel>
        <Select size="sm" placeholder="All" defaultValue={query?.industry}>
          {getFilterList('industry').map((value) => (
            <Link
              key={value}
              passHref
              prefetch={false}
              href={{
                pathname: '/dashboard',
                query: {
                  ...query,
                  page: 1,
                  industry: value
                }
              }}
              className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
            >
              <Option value={value}>{value}</Option>
            </Link>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Accounts</FormLabel>
        <Select size="sm" placeholder="All" defaultValue={query?.account}>
          {getFilterList('account').map((value) => (
            <Link
              key={value}
              passHref
              prefetch={false}
              href={{
                pathname: '/dashboard',
                query: {
                  ...query,
                  page: 1,
                  account: value
                }
              }}
              className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
            >
              <Option value={value}>{value}</Option>
            </Link>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>State</FormLabel>
        <Select size="sm" placeholder="All" defaultValue={query?.state}>
          {getFilterList('state').map((value) => (
            <Link
              key={value}
              passHref
              prefetch={false}
              href={{
                pathname: '/dashboard',
                query: {
                  ...query,
                  page: 1,
                  state: value
                }
              }}
              className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
            >
              <Option value={value}>{getStateFullName(value)}</Option>
            </Link>
          ))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel> </FormLabel>
        <Link
          passHref
          href={{
            pathname: '/dashboard',
            query: {
              page: 1
            }
          }}
        >
          <Button sx={{ mt: '1rem' }} variant="plain">
            Clean filters
          </Button>
        </Link>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: {
            xs: 'flex',
            sm: 'none'
          },
          my: 1,
          gap: 1
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: {
            xs: 'none',
            sm: 'flex'
          },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: {
              xs: '120px',
              md: '160px'
            }
          }
        }}
      >
        {/*<FormControl sx={{ flex: 1 }} size="sm">*/}
        {/*  <FormLabel>Search for order</FormLabel>*/}
        {/*  <Input*/}
        {/*    size="sm"*/}
        {/*    placeholder="Search"*/}
        {/*    startDecorator={<SearchIcon />}*/}
        {/*  />*/}
        {/*</FormControl>*/}
        {renderFilters()}
      </Box>

      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px'
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 35, padding: '12px 6px' }}>Client</th>
              <th style={{ width: 140, padding: '12px 6px' }}></th>
              <th style={{ width: 60, padding: '12px 6px' }}>Amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Industry</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Transaction</th>
              <th style={{ width: 140, padding: '12px 6px' }}>State</th>
            </tr>
          </thead>
          <tbody>
            {!rows.length ? (
              <tr>
                <td colSpan={7}>
                  <Typography align="center">
                    No transactions that matches your query
                  </Typography>
                </td>
              </tr>
            ) : (
              <>
                {rows.map((row: Products) => (
                  <tr key={row.date}>
                    <td>
                      <Box
                        sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                      >
                        <Avatar size="sm">
                          {generateLetters(row.account)}
                        </Avatar>
                      </Box>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.account}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {formatCurrency({
                          value: row.amount,
                          currency: row.currency
                        })}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.industry}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {convertDate(row.date)}
                      </Typography>
                    </td>

                    <td>
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                          {
                            deposit: <ArrowCircleDown />,
                            withdraw: <ArrowCircleUp />
                          }[row.transaction_type]
                        }
                        color={
                          {
                            deposit: 'success',
                            withdraw: 'neutral'
                          }[row.transaction_type] as ColorPaletteProp
                        }
                      >
                        {row.transaction_type}
                      </Chip>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {getStateFullName(row.state)}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex'
          }
        }}
      >
        <Link
          href={{
            pathname: '/dashboard',
            query: {
              ...query,
              page: page > 1 ? page - 1 : 1
            }
          }}
          className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
          >
            Previous
          </Button>
        </Link>
        <Box sx={{ flex: 1 }} />
        {/*{['1', '2', '3', '…', '8', '9', '10'].map((page) => (*/}
        {/*  <IconButton*/}
        {/*    key={page}*/}
        {/*    size="sm"*/}
        {/*    variant={Number(page) ? 'outlined' : 'plain'}*/}
        {/*    color="neutral"*/}
        {/*  >*/}
        {/*    {page}*/}
        {/*  </IconButton>*/}
        {/*))}*/}
        <Box sx={{ flex: 1 }} />
        <Link
          href={{
            pathname: '/dashboard',
            query: {
              ...query,
              page: page + 1
            }
          }}
          className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
          >
            Next
          </Button>
        </Link>
      </Box>
    </React.Fragment>
  );
}
