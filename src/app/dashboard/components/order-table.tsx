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
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
// icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { getProducts } from '@/use-cases/get-products';
import { getCurrencyFullName } from '@/helpers/currency';
import { getFilterList } from '@/use-cases/filterProducts';
import { getStateFullName } from '@/utils/get-states';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const generateLetters = (name: string) => {
  return name
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '')
    .slice(0, 2);
};

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const convertDate = (date: string) => {
  const myDate = new Date(date);
  return (
    myDate.getDate() +
    '/' +
    myDate.toLocaleString('en-us', {
      month: 'short'
    }) +
    '/' +
    myDate.getFullYear() +
    ' ' +
    myDate.getHours() +
    ':' +
    myDate.getMinutes()
  );
};

export default function OrderTable({ page, rows }) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          {getFilterList('transaction_type').map((value) => (
            <Option key={value} value="all">
              {value}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Accounts</FormLabel>
        <Select size="sm" placeholder="All">
          {getFilterList('account').map((value) => (
            <Option key={value} value="all">
              {value}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>State</FormLabel>
        <Select size="sm" placeholder="All">
          {getFilterList('state').map((value) => (
            <Option key={value} value="all">
              {getStateFullName(value)}
            </Option>
          ))}
        </Select>
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
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
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
              {/*<th*/}
              {/*  style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}*/}
              {/*>*/}
              {/*  <Checkbox*/}
              {/*    size="sm"*/}
              {/*    indeterminate={*/}
              {/*      selected.length > 0 && selected.length !== rows.length*/}
              {/*    }*/}
              {/*    checked={selected.length === rows.length}*/}
              {/*    onChange={(event) => {*/}
              {/*      setSelected(*/}
              {/*        event.target.checked ? rows.map((row) => row.id) : []*/}
              {/*      );*/}
              {/*    }}*/}
              {/*    color={*/}
              {/*      selected.length > 0 || selected.length === rows.length*/}
              {/*        ? 'primary'*/}
              {/*        : undefined*/}
              {/*    }*/}
              {/*    sx={{ verticalAlign: 'text-bottom' }}*/}
              {/*  />*/}
              {/*</th>*/}
              {/*<th style={{ width: 120, padding: '12px 6px' }}>*/}
              {/*  <Link*/}
              {/*    underline="none"*/}
              {/*    color="primary"*/}
              {/*    component="button"*/}
              {/*    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}*/}
              {/*    fontWeight="lg"*/}
              {/*    endDecorator={<ArrowDropDownIcon />}*/}
              {/*    sx={{*/}
              {/*      '& svg': {*/}
              {/*        transition: '0.2s',*/}
              {/*        transform:*/}
              {/*          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'*/}
              {/*      }*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Invoice*/}
              {/*  </Link>*/}
              {/*</th>*/}

              <th style={{ width: 35, padding: '12px 6px' }}>Client</th>
              <th style={{ width: 140, padding: '12px 6px' }}></th>
              <th style={{ width: 60, padding: '12px 6px' }}>Amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Industry</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Currency</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Transaction</th>
              <th style={{ width: 140, padding: '12px 6px' }}>State</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.account}>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{generateLetters(row.account)}</Avatar>
                  </Box>
                </td>
                <td>
                  <Typography level="body-xs">{row.account}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.amount}</Typography>
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
                  <Typography level="body-xs">
                    {getCurrencyFullName(row.currency)}
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
            pathname: '/',
            query: {
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
