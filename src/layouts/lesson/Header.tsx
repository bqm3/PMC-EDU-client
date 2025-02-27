import { m } from 'framer-motion';
import { useRef } from 'react';

import { useLocation, useParams } from 'react-router-dom';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Link,
  BoxProps,
  Typography,
  Stack,
  Card,
  IconButton,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER, MINI_HEADER } from '../../config';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
// //
// import navConfig from './nav/config';
// import NavMobile from './nav/mobile';
// import NavDesktop from './nav/desktop';
import { useAuthContext } from 'src/auth/useAuthContext';
import Logo from './Logo';
// import AccountPopover from './nav/AccountPopover';

// ----------------------------------------------------------------------

export default function Header() {
  const carouselRef = useRef(null);

  const { user, logout } = useAuthContext();
  const location = useLocation();

  const tenkhoahoc = location.state?.Tenkhoahoc;

  const navigate = useNavigate();

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  // const filteredNavConfig = navConfig.filter((link) => {
  //   if (user && link.isAuthButton) {
  //     return false; // Ẩn các nút đăng ký, đăng nhập nếu user tồn tại
  //   }
  //   return true; // Hiển thị các mục khác
  // });

  return (
    <AppBar ref={carouselRef} color="transparent" sx={{ boxShadow: 0 }}>
      <Stack
        sx={{
          // display: {
          //   md: 'flex',
          //   sm: 'none',
          // },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          // justifyContent: 'left',
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
          <Link component={'button'} onClick={() => navigate(-1)}>
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                fontSize: 14,
                display: { xs: 'none', sm: 'flex' }, // Ẩn ở kích thước nhỏ (xs),

                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: 20 }} />
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
