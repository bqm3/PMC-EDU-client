import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
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

// ----------------------------------------------------------------------

type Props = {
  product: any;
};

export default function ShopProductCard({ product }: Props) {
  const { id, title, description, link, quantity, cover } = product;
  // id: _mock.id(index),
  // title: _mock.text.title(index),
  // description: _mock.text.description(index),
  // link: "https://www.youtube.com/embed/U6QLCwDxnns",
  // quantity: _mock.number.percent(index) * 100,
  // cover: `/assets/images/rooms/room_${index + 1}.jpg`,
  const dispatch = useDispatch();

  // const handleAddCart = async () => {
  //   const newProduct = {
  //     id,
  //     name,
  //     cover,
  //     available,
  //     price,
  //     colors: [colors[0]],
  //     size: sizes[0],
  //     quantity: 1,
  //   };
  //   try {
  //     dispatch(addToCart(newProduct));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
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

        <Fab
          color="warning"
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
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>

        <Image alt={cover} src={cover} ratio="16/9" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        <Typography color="inherit" variant="subtitle2">
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {/* {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Box>
            )} */}

            <Box component="span">({quantity})</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
