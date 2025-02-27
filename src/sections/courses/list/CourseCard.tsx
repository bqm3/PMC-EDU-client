import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../redux/store';
import { addToCart } from '../../../redux/slices/product';
// @types
import { IProduct } from '../../../@types/product';
// components
import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import Image from '../../../components/image';
import { ColorPreview } from '../../../components/color-utils';
import { IKhoahoc } from 'src/@types/course';

// ----------------------------------------------------------------------

type Props = {
  product: IKhoahoc;
};

export default function ShopProductCard({ product }: Props) {
  const {
    ID_Khoahoc,

    SlugTenkhoahoc,
    Tenkhoahoc,
    Gioithieuchung,
    Sotiethoc,
    Tongthoigian,
    Hinhanh,
    isDelete, } = product;


  const linkTo = PATH_PAGE.courses.view(`${SlugTenkhoahoc}`);

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', px: 2, py: 1 }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}

        {/* <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
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
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab> */}

        <Image alt={Hinhanh} src={Hinhanh} ratio="16/9" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={1} sx={{ px: 2, pb: 1 }}>
        <Link to={linkTo} component={RouterLink} color="inherit" variant="subtitle1" noWrap>
          {Tenkhoahoc}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
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
        </Stack>
      </Stack>
    </Card>
  );
}
