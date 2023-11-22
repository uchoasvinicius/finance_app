import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './components/sidebar';
import Header from './components/header';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />

        <Box
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>

          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
