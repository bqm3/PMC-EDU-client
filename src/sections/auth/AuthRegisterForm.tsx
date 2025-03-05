import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
import { useSnackbar } from '../../components/snackbar';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  Email: string;
  Tendangnhap: string;
  Matkhau: string;
  Hodem: string;
  Ten: string;
  Dctamtru: string;
  afterSubmit?: string;
};

export default function AuthRegisterForm() {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const RegisterSchema = Yup.object().shape({
    Tendangnhap: Yup.string()
      .required('Số điện thoại là bắt buộc')
      .matches(/^(03|05|07|08|09)\d{8}$/, 'Chưa đúng định dạng số điện thoại'),

    Hodem: Yup.string()
      .matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Họ và tên đệm không được chứa số')
      .required('Họ và tên đệm là bắt buộc'),

    Ten: Yup.string()
      .matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên không được chứa số')
      .required('Tên là bắt buộc'),

    Email: Yup.string()
      .email('Email chưa đúng định dạng')
      .required('Email là bắt buộc'),

    Matkhau: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu là bắt buộc'),

    Nhaplaimatkhau: Yup.string()
      .oneOf([Yup.ref('Matkhau'), null], 'Mật khẩu nhập lại không khớp')
      .required('Vui lòng nhập lại mật khẩu'),

    Dctamtru: Yup.string().required('Địa chỉ tạm trú là bắt buộc'),

  });

  const defaultValues = {
    Tendangnhap: '',
    Hodem: '',
    Ten: '',
    Email: '',
    Matkhau: '',
    Dctamtru: ''
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (register) {
        await register(data.Email, data.Matkhau, data.Hodem, data.Ten, data.Tendangnhap, data.Dctamtru);
      }
      navigate(PATH_AUTH.login)
      enqueueSnackbar('Vui lòng đợi quản lý đào tạo xác nhận tài khoản', {
        variant: 'success',
        autoHideDuration: 5000,
      });
      reset();
    } catch (error) {
      console.error(error);
      // reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField size='small' name="Hodem" label="Họ tên đệm" />
          <RHFTextField size='small' name="Ten" label="Tên" />
        </Stack>

        <RHFTextField size='small' name="Email" label="Email" />
        <RHFTextField size='small' name="Dctamtru" label="Địa chỉ tạm trú" />

        <RHFTextField size='small' name="Tendangnhap" label="Số điện thoại (Tên đăng nhập)" />
        <RHFTextField size='small'
          name="Matkhau"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          size='small'
          name="Nhaplaimatkhau"
          label="Nhập lại mật khẩu"
          type={showPasswordAgain ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPasswordAgain(!showPasswordAgain)} edge="end">
                  <Iconify icon={showPasswordAgain ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Tạo tài khoản
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
