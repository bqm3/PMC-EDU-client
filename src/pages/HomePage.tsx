import { Helmet } from 'react-helmet-async';
import { m, useScroll, useSpring } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Stack } from '@mui/material';

import { useSettingsContext } from '../components/settings';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { IProduct, IProductFilter } from '../@types/product';
// _mock
import { _courseList } from '../_mock/arrays/_course';

import { _mapContact } from 'src/_mock/arrays';
// sections
import {
  HomeHero,
  Archievements,
  ContactHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeForDesigner,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
  ContactForm,
  ContactMap,
  AboutTeam,
  HomeNews,
} from '../sections/home';

import { HomeCourseList } from '../sections/home/course';
import { PATH_AUTH } from 'src/routes/paths';
import path from 'path';

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  const { dm_khoahoc } = useSelector((state) => state.course);

  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Trung tâm đào tạo</title>
      </Helmet>

      {progress}

      <ContactHero />
      {/* <HomeHero /> */}

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container
          maxWidth={themeStretch ? false : 'lg'}
          sx={{
            justifyItems: 'center',
            alignItems: 'center',
            my: { xs: 5, md: 10 },
          }}
        >
          <HomeCourseList courses={dm_khoahoc} loading={!dm_khoahoc.length} />

          <Button
            variant="contained"
            to="khoa-hoc/danh-sach/"
            component={RouterLink}
            sx={{
              mt: 4,
            }}
          >
            Tất cả các khóa học
          </Button>
        </Container>
        <Archievements />

        <Container sx={{ pt: { md: 10, xs: 5 } }}>
          <AboutTeam />
          <Box
            gap={10}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            <ContactForm />
            <ContactMap />
          </Box>

          <HomeNews />
        </Container>

        {/* <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricingPlans />

        <HomeLookingFor />

        <HomeAdvertisement /> */}
      </Box>
    </>
  );
}
