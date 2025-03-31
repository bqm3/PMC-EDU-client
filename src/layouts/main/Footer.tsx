import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { useEffect } from 'react';

// ----------------------------------------------------------------------
interface FB {
  XFBML: {
    parse: () => void;
  };
}

const LINKS = [
  {
    headline: 'Cộng đồng',
    children: [
      { name: 'CÂU HỎI THƯỜNG GẶP', href: PATH_PAGE.about },
      { name: 'HỌC BỔNG', href: PATH_PAGE.contact },
      { name: 'KHÓA HỌC MIỄN PHÍ', href: PATH_PAGE.faqs },
      { name: 'TRỞ THÀNH GIẢNG VIÊN', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Menu',
    children: [
      { name: 'TIN TỨC', href: '#' },
      { name: 'CƠ HỘI NGHỀ NGHIỆP', href: '#' },
      { name: 'ĐÀO TẠO KÉP', href: '#' },
      { name: 'ĐỐI TÁC ĐÀO TẠO', href: '#' },
    ],
  },
];

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

export default function Footer() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by &nbsp;
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Typography>
      </Container>
    </Box>
  );

  useEffect(() => {
    const fb = (window as unknown as { FB?: FB }).FB;
    if (fb) {
      fb.XFBML.parse(); // Gọi phương thức parse của Facebook
    }
  }, []);

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: { md: 10, xs: 4 } }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >

          <Grid item xs={6} md={3}>
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography component="div" variant="overline">
                Giới thiệu
              </Typography>

              <Typography variant="body2" sx={{ pr: { md: 4 } }}>
                PMC Knowledge cung cấp các chương trình đào tạo on the job training về chuyên môn,
                kiến thức, kỹ năng cần thiết trong lĩnh dịch vụ Bất động sản.
              </Typography>
            </Stack>
            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: { xs: 2, md: 0 },
                mb: { xs: 2, md: 0 },
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
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1,
                      p: 0.5,
                      '&:hover': {
                        backgroundColor: item.hoverColor, // Dynamic hover background color
                      },
                    }}
                  >
                    <item.Icon style={{ color: item.color, fontSize: 22 }} />
                  </Box>
                </a>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              spacing={5}
              justifyContent="space-around"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      component={RouterLink}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography component="div" variant="overline">
                Giới thiệu
              </Typography>

              <div
                className="fb-page"
                data-href="https://www.facebook.com/pmcknowledge.vn"
                data-tabs="pmck, pmc, d&#xe0;o t&#x1ea1;o, v&#x103;n b&#x1eb1;ng, d&#x1ea1;y h&#x1ecd;c"
                data-width=""
                data-height=""
                data-small-header="true"
                data-adapt-container-width="false"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote
                  cite="https://www.facebook.com/pmcknowledge.vn"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/pmcknowledge.vn">PMC Knowledge</a>
                </blockquote>
              </div>
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2025. Phòng Số Hóa - PMC
        </Typography>
      </Container>
    </Box>
  );

  // return isHome ? simpleFooter : mainFooter;
  return mainFooter;
}
