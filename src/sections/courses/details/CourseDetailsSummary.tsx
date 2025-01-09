import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { Box, Link, Stack, Button, Rating, Divider, Typography, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// @types
import { IProduct, ICheckoutCartItem } from '../../../@types/product';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import { IncrementerButton } from '../../../components/custom-input';
import { ColorSinglePicker } from '../../../components/color-utils';
import FormProvider, { RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<ICheckoutCartItem, 'colors'> {
  colors: string;
}

type Props = {
  product: IProduct;
  cart: ICheckoutCartItem[];
  onAddCart: (cartItem: ICheckoutCartItem) => void;
  onGotoStep: (step: number) => void;
};

export default function ProductDetailsSummary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  ...other
}: Props) {
  const navigate = useNavigate();

  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType,
  } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);

  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    cover,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          ...data,
          colors: [values.colors],
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep(0);
      navigate(PATH_DASHBOARD.eCommerce.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        colors: [values.colors],
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          p: (theme) => ({
            md: theme.spacing(0, 5, 0, 2),
          }),
        }}
        {...other}
      >
        <Stack spacing={2}>
          <Label
            variant="soft"
            color={inventoryType === 'in_stock' ? 'success' : 'error'}
            sx={{ textTransform: 'uppercase', mr: 'auto' }}
          >
            Kỹ năng làm sạch
          </Label>
          <Typography variant="h5">An toàn, Vệ sinh lao động ngành Vệ sinh công nghiệp</Typography>
          <Typography variant='body1'>
            Khóa học chuyên sâu và tập trung về các kiến thức và kỹ năng thiết yếu trong công tác kế toán tổng hợp và quản lý công nợ dự án, là sự chuẩn bị để hoàn thiện các bút toán tổng hợp, hoàn tất hạch toán các phần hành để lên Báo cáo tài chính theo đúng các chuẩn mực và quy định hiện hành.
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={10} precision={0.1} readOnly />

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(234)}{" "}
              học viên)
            </Typography>
          </Stack>
        </Stack>

      </Stack>
    </FormProvider>
  );
}
