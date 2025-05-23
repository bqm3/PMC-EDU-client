import { m } from 'framer-motion';
import { useRef } from 'react';
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
import Iconify from '../../components/iconify';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER, MINI_HEADER } from '../../config';
// routes
import { PATH_DOCS, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Logo from '../../components/logo';
import Label from '../../components/label';
//
import navConfig from './nav/config';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { useAuthContext } from 'src/auth/useAuthContext';
import AccountPopover from './nav/AccountPopover';

const socialMediaLinks = [
  {
    href: 'https://www.facebook.com/pmcknowledge.vn',
    color: '#1877F2',
    hoverColor: 'rgba(24, 119, 242, 0.1)',
    Icon: FacebookIcon,
  },
  {
    href: 'https://www.youtube.com/@pmcknowledge2450',
    color: '#FF0000',
    hoverColor: 'rgba(255, 0, 0, 0.1)',
    Icon: YouTubeIcon,
  },

];

// ----------------------------------------------------------------------

export default function Header() {
  const carouselRef = useRef(null);

  const { user, logout } = useAuthContext()

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  const filteredNavConfig = navConfig.filter((link) => {
    if (!user) {
      // Nếu chưa đăng nhập, ẩn "Khóa học của tôi" và "Khóa học trung tâm"
      return link.path !== '/lop-hoc-cua-toi' && link.path !== '/lop-hoc-trung-tam';
    }

    // Nếu đã đăng nhập, chỉ hiển thị các mục không phải isAuthButton
    return !link.isAuthButton;
  });


  return (
    <AppBar ref={carouselRef} color="transparent" sx={{ boxShadow: 0 }}>
      {/* <Box
        sx={{
          display: {
            md: 'flex',
            sm: 'none',
          },
          alignItems: 'center',
          justifyContent: 'space-around',
          height: {
            md: MINI_HEADER.H_MAIN_DESKTOP,
            sm: 0,
            xs: 0,
          },
          backgroundColor: '#89b449',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            fontSize: 14,
            display: { xs: 'none', sm: 'block' }, // Ẩn ở kích thước nhỏ (xs)
          }}
        >
          Tiếng Việt (Vi)
        </Typography>
        <div
          style={{
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <PhoneEnabledIcon
                sx={{
                  color: 'white',
                  fontSize: 22,
                  display: {
                    md: 'flex',
                    sm: 'none',
                  },
                }}
              />
              <a href="tel:+84913835385" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontSize: 14,
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                    display: { xs: 'none', sm: 'block' }, // Ẩn ở kích thước nhỏ (xs)
                  }}
                >
                  +84913835385
                </Typography>
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <LocationOnIcon
                sx={{
                  color: 'white',
                  fontSize: 22,
                  display: {
                    md: 'flex',
                    sm: 'none',
                  },
                }}
              />
              <a
                href="https://www.google.com/maps?q=Sky+City+Towers,+88+Láng+Hạ,+Đống+Đa,+Hà+Nội"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontSize: 14,
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                    display: { xs: 'none', sm: 'block' }, // Ẩn ở kích thước nhỏ (xs)
                  }}
                >
                  Sky City Towers, 88 Láng Hạ, Đống Đa, Hà Nội
                </Typography>
              </a>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            {socialMediaLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: item.hoverColor,
                    },
                    display: { xs: 'none', sm: 'flex', md: 'inline-flex' }, // Ẩn ở kích thước nhỏ (xs)
                  }}
                >
                  <item.Icon style={{ color: item.color, fontSize: 22 }} />
                </Box>
              </a>
            ))}
          </div>
        </div>
      </Box> */}

      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 8,
            },
          }),
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={filteredNavConfig} />}

          {user && (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "16px" }}>

              <Typography sx={{
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                color: 'text.secondary',
                fontWeight: "medium"
              }}>Hi, {user.Ten}!</Typography>
              <AccountPopover />

            </Box>
          )}

          {!isDesktop && <NavMobile isOffset={isOffset} data={filteredNavConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
