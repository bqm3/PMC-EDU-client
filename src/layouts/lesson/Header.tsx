import { useRef } from 'react';

import { useLocation, useParams } from 'react-router-dom';
// @mui
import {
  AppBar,
  Link,
  Typography,
  Stack,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// config
import { HEADER, MINI_HEADER } from '../../config';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
import Logo from './Logo';
// import AccountPopover from './nav/AccountPopover';

// ----------------------------------------------------------------------

export default function Header() {
  const carouselRef = useRef(null);
  const { name } = useParams();
  const location = useLocation();

  const tenkhoahoc = location.state?.Tenkhoahoc;

  const navigate = useNavigate();

  return (
    <AppBar ref={carouselRef} color="transparent" sx={{ boxShadow: 0 }}>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          height: {
            md: MINI_HEADER.H_MAIN_DESKTOP,
            sm: MINI_HEADER.H_MAIN_DESKTOP - 10,
            xs: MINI_HEADER.H_MAIN_DESKTOP - 5,
          },
          backgroundColor: '#29303b',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
          }}
        >
          <Link
            component="button"
            onClick={() => window.location.replace(`/lop-hoc-cua-toi/${name}`)}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              gap: 0.5,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 500 }}>
              Quay lại
            </Typography>
          </Link>

          <Logo sx={{ mx: 1 }} />
          <Typography color="text.info" sx={{ color: 'white', fontWeight: '600' }}>
            {tenkhoahoc}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ color: 'white', fontWeight: '600' }}>Hướng dẫn</Typography>
        </Stack>
      </Stack>
    </AppBar>
  );
}

// ----------------------------------------------------------------------
