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


// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  phoneNumber: string;
};

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Phải đúng định dạng Email').required('Email là bắt buộc'),
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc')
      .matches(
        /^(03|05|07|08|09)\d{8}$/,
        'Chưa đúng định dạng số điện thoại'
      ),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '', phoneNumber: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      sessionStorage.setItem('email-recovery', data.email);

      navigate(PATH_AUTH.newPassword);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Địa chỉ Email" />
        <RHFTextField name="phoneNumber" label="Số điện thoại" />
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
