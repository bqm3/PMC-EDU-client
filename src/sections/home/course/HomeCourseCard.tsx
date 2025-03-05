import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab, Typography } from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
// routes
import { PATH_PAGE } from '../../../routes/paths';
import Image from '../../../components/image';
import { IKhoahoc } from 'src/@types/course';

// ----------------------------------------------------------------------

type Props = {
  course: IKhoahoc;
};

export default function CourseCard({ course }: Props) {
  const { ID_Khoahoc, Tenkhoahoc, Hinhanh, Tongthoigian, Sotiethoc, SlugTenkhoahoc } = course;

  const linkTo = PATH_PAGE.courses.view(`${SlugTenkhoahoc}`);

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        <Link to={linkTo} component={RouterLink} color="inherit" variant="subtitle1" noWrap>

          <Fab
            color="success"
            size="medium"
            className="add-cart-btn"

            // onClick={handleAddCart}
            sx={{
              right: 16,
              bottom: 16,
              zIndex: 9,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <RemoveRedEyeRoundedIcon />
          </Fab>
        </Link>
        <Image alt={Hinhanh} src={Hinhanh} ratio="16/9" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        <Link to={linkTo} component={RouterLink} color="inherit" variant="subtitle1" noWrap>
          {Tenkhoahoc}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          {/* <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {Sotiethoc && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(Sotiethoc)}
              </Box>
            )} */}

          <Box component="span" color="inherit" >
            <Typography color="inherit" variant="subtitle2">
              Số tiết: {Sotiethoc}
            </Typography>
          </Box>
          <Box component="span" color="inherit" >
            <Typography color="inherit" variant="subtitle2">
              Thời gian: {Tongthoigian}(h)
            </Typography>
          </Box>
          {/* </Stack> */}
        </Stack>
      </Stack>
    </Card>
  );
}
