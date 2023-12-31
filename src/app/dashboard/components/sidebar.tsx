'use client';

import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';

import { closeSidebar } from './utils';
import React from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const token = getCookie('token') || '';
  const user = JSON.parse(atob(token));
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  const checkActiveTab = (path: string) => pathname === path;

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky'
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px'
            }
          }
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          }
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Acme Co.</Typography>
      </Box>

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5
          }
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm
          }}
        >
          <Link
            href={{
              pathname: '/dashboard'
            }}
            legacyBehavior
            passHref
            className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
          >
            <ListItem>
              <ListItemButton selected={checkActiveTab('/dashboard')}>
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            href={{
              pathname: '/dashboard/charts'
            }}
            passHref
            legacyBehavior
            className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
          >
            <ListItem>
              <ListItemButton selected={checkActiveTab('/dashboard/charts')}>
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Charts</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2
          }}
        >
          <Link
            passHref
            legacyBehavior
            href="https://github.com/uchoasvinicius/finance_app"
          >
            <ListItem>
              <ListItemButton>
                <SupportRoundedIcon />
                Support
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{user.name}</Typography>
          <Typography level="body-xs">{user.email}</Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={() => logout()}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
