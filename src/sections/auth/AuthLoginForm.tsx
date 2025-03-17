import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  Tendangnhap: string;
  Matkhau: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    Tendangnhap: Yup.string().required('Số điện thoại là bắt buộc')
      .matches(
        /^(03|05|07|08|09)\d{8}$|^PMC\d+$/i,
        'Chưa đúng định dạng số điện thoại hoặc mã PMC'
      )
    ,
    Matkhau: Yup.string().required('Mật khẩu là bắt buộc'),
  });

  const defaultValues = {
    Tendangnhap: '',
    Matkhau: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.Tendangnhap, data.Matkhau); // ✅ Chờ đăng nhập hoàn tất

      // 🛠 Kiểm tra nếu có trang trước đó, chuyển hướng đến đó
      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectAfterLogin, { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", { message: error.response.data.message });
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="Tendangnhap" label="Số điện thoại" />

        <RHFTextField
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
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          to={PATH_AUTH.resetPassword}
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
