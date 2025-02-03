import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../auth/useAuthContext';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { Box, Link, Stack, Button, Rating, Divider, Typography, IconButton } from '@mui/material';
// routes
import { PATH_AUTH, PATH_DASHBOARD, PATH_EXERCISE, PATH_LESSON } from '../../../routes/paths';
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

export default function CourseDetailsAdd({
  cart,
  product,
  onAddCart,
  onGotoStep,
  ...other
}: Props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

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

  const onSubmit = async (data: FormValuesProps, event: any) => {

    const clickedButton = event.nativeEvent.submitter; // Lấy thông tin nút được nhấn
    const action = clickedButton?.name; // Lấy thuộc tính name hoặc value của nút
    try {
      if (action === 'register') {
        // Xử lý cho nút 'Đăng ký học'
        if (user) {
          navigate(PATH_LESSON.root);
        } else {
          const currentPath = window.location.pathname; // Lấy URL hiện tại
          navigate(PATH_AUTH.login, { state: { from: currentPath } }); // Lưu đường dẫn
        }
      } else if (action === 'registerAdvanced') {
        // Xử lý cho nút 'Đăng ký học nâng cao'
        console.log('Đăng ký học nâng cao với dữ liệu:', data);
        navigate(PATH_EXERCISE.root);
        // Điều hướng hoặc thực hiện hành động khác
      }
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
      <Stack sx={{ textAlign: 'center' }} spacing={1}>
        <Box
          component="img"
          alt={name}
          src={'http://pmck.edu.vn/pluginfile.php?file=%2F405%2Fcourse%2Foverviewfiles%2FAn%20to%C3%A0n%20An%20ninh.PNG'}
          sx={{ borderRadius: 2 }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: 24,
            color: '#89b449'
          }}
        >
          Tự đăng ký
        </Typography>

        {/* <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Đăng ký
          </Button> */}

        <Button fullWidth size="large" type="submit" name="register" variant="contained">
          Đăng ký học
        </Button>
        <Button fullWidth size="large" type="submit" name="registerAdvanced" variant="contained">
          Thi trực tuyến
        </Button>
      </Stack>
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          padding: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ textAlign: 'left', width: '100%', fontSize: 14 }}>
          Trình độ cơ bản
        </Typography>
        <Typography variant="subtitle2" sx={{ textAlign: 'left', width: '100%', fontSize: 14 }}>
          Tổng số 12 bài học
        </Typography>
        <Typography variant="subtitle2" sx={{ textAlign: 'left', width: '100%', fontSize: 14 }}>
          Thời lượng 03 giờ 26 phút
        </Typography>
        <Typography variant="subtitle2" sx={{ textAlign: 'left', width: '100%', fontSize: 14 }}>
          Học mọi lúc mọi nơi
        </Typography>
      </Stack>

      {/* <Typography variant="h6">
        Thời gian: 10 tiếng
      </Typography> */}
    </FormProvider >
  );
}
