// @mui
import { Typography, Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
// components
import Header from './Header';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LessonLayout({ children }: any) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Stack sx={{ width: 1 }}>
        <Outlet />
      </Stack>

    </Box>
  );
}
