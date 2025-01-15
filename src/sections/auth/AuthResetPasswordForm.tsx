import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import axios from 'axios';


// ----------------------------------------------------------------------

type FormValuesProps = {
  Email: string;
  Tendangnhap: string;
};

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const ResetPasswordSchema = Yup.object().shape({
    Email: Yup.string().email('Phải đúng định dạng Email').required('Email là bắt buộc'),
    Tendangnhap: Yup.string().required('Số điện thoại là bắt buộc')
      .matches(
        /^(03|05|07|08|09)\d{8}$/,
        'Chưa đúng định dạng số điện thoại'
      ),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { Email: '', Tendangnhap: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await axios.post("/api/v1/hosohv/forget-password", data)
        .then((res) => {
          enqueueSnackbar('Vui lòng kiểm tra email để nhận mã xác nhận', {
            variant: 'success',
            autoHideDuration: 5000,
          });
          navigate(PATH_AUTH.login);
        })
        .catch((err) => {
          enqueueSnackbar(err.message || 'Lỗi! Vui lòng kiểm tra lại', {
            variant: 'error',
            autoHideDuration: 5000,
          });
          console.error(err);
        });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="Email" label="Địa chỉ Email" />
        <RHFTextField name="Tendangnhap" label="Số điện thoại" />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Gửi yêu cầu
      </LoadingButton>
    </FormProvider>
  );
}
