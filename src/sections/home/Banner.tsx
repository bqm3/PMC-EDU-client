import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Grid } from '@mui/material';
//
import { TextAnimate, MotionContainer, varFade } from '../../components/animate';
import { HEADER, MINI_HEADER } from 'src/config';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  marginTop: HEADER.H_MOBILE,
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
    marginTop: MINI_HEADER.H_MAIN_DESKTOP + HEADER.H_MAIN_DESKTOP
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    top: 200,
    textAlign: 'left',
    position: 'absolute',
  },
  '& .MuiTypography-root': {
    fontSize: '1.5rem', // Kích thước mặc định

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem', // Kích thước cho màn hình nhỏ
    }
  }
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <Stack spacing={2} display="inline-flex" direction="row">
            <TextAnimate
              text="TAKE"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
                color: 'primary.main',
              }}
              variants={varFade().inRight}
            />
            <TextAnimate
              text="THE"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
                color: 'primary.main',
              }}
              variants={varFade().inRight}
            />
            <TextAnimate
              text="FIRST"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
                color: 'primary.main',
              }}
              variants={varFade().inRight}
            />
            <TextAnimate
              text="STEP"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
                color: 'primary.main',
              }}
              variants={varFade().inRight}
            />
          </Stack>
          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate
              text="TO"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
              }}
            />
            <TextAnimate
              text="KNOWLEDGE"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
              }}
            />
            <TextAnimate
              text="WITH"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
              }}
            />
            <TextAnimate
              text="US"
              sx={{
                fontSize: {
                  xs: '1.5rem', // Kích thước chữ nhỏ

                },
              }}
            />
          </Stack>

          {/* <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid
                key={contact.country}
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                sx={{
                  pr: {
                    md: 5,
                  },
                }}
              >
                <m.div variants={varFade().in}>
                  <Typography variant="h6" paragraph>
                    {contact.country}
                  </Typography>
                </m.div>

                <m.div variants={varFade().inRight}>
                  <Typography variant="body2">
                    {contact.address}
                    <br /> {contact.phoneNumber}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid> */}
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
