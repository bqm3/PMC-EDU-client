import { Outlet } from 'react-router-dom';
// @mui
import { Stack, Container, Box } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// config
import { HEADER } from '../../config';
//
import Header from './Header';

// ----------------------------------------------------------------------

export default function ExerciseLayout() {

  return (
    <>
      <Container component="main">
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
