import { Outlet } from 'react-router-dom';
// @mui
import { Stack, Container } from '@mui/material';
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
        <Stack
          sx={{
            m: 'auto',
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </>
  );
}
