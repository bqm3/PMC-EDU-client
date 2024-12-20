import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Grid } from '@mui/material';
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faSchool, faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

import HandshakeIcon from '@mui/icons-material/Handshake';
import { TextAnimate, MotionContainer, varFade } from '../../components/animate';
import { HEADER, MINI_HEADER } from 'src/config';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    icon: faHandshake,
    quantity: '10000',
    name: 'CHỨNG CHỈ',
  },
  {
    icon: faSchool,
    quantity: '1000',
    name: 'LỚP HỌC',
  },
  {
    icon: faUserGraduate,
    quantity: '5000',
    name: 'HỌC VIÊN',
  },
  {
    icon: faChalkboardTeacher,
    quantity: '200',
    name: 'GIẢNG VIÊN',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  marginTop: MINI_HEADER.H_MAIN_DESKTOP + HEADER.H_MAIN_DESKTOP,
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    paddingTop: 60,
    textAlign: 'center',
    // position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function Archievements() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <Stack spacing={2} display="inline-flex" direction="row">
            <Typography sx={{
              color: 'primary.main', fontSize: {
                md: 60,
                xs: 48
              }, fontWeight: '700'
            }}>
              THÀNH TỰU
            </Typography>
          </Stack>
          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <m.div variants={varFade().inUp}>
              <Typography sx={{
                fontSize: {
                  md: 30,
                  xs: 24
                }, fontWeight: '700'
              }}>
                Số liệu thống kê về Trung tâm Giáo dục
              </Typography>
            </m.div>
          </Stack>

          <Grid
            container
            spacing={5}
            sx={{
              mt: 5,
              color: 'common.white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {CONTACTS.map((contact: any) => (
              <Grid
                key={contact.name}
                item
                xs={12}
                sm={6}
                md={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column', // Stack items vertically
                  alignItems: 'center',   // Center items within each grid
                  textAlign: 'center',    // Optional: Center text
                }}
              >
                <m.div variants={varFade().in}>
                  <FontAwesomeIcon icon={contact.icon} size="3x" />
                </m.div>

                <ContactCard contact={contact} />
              </Grid>
            ))}
          </Grid>

        </StyledContent>
      </Container>
    </StyledRoot>
  );
}

function AnimatedCounter({ value }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2; // Duration of the animation in seconds
    const increment = Math.ceil(value / (duration * 60)); // Increment per frame (~60fps)

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        clearInterval(timer);
        current = value;
      }
      setCount(current);
    }, 2000 / 60);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}

function ContactCard({ contact }: any) {
  return (
    <m.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ marginTop: 20 }}
    >
      <Typography variant="h2" sx={{ color: 'yellow' }}>
        <AnimatedCounter value={parseInt(contact.quantity, 10)} />
      </Typography>
      <Typography variant="h6">{contact.name}</Typography>
    </m.div>
  );
}