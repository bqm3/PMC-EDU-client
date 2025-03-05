import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { IUserAccountChangePassword } from '../../../@types/user';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import axios from 'axios';

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const accessToken = localStorage.getItem('accessToken');

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      axios
        .put(`/api/v1/hosons/change-password`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          enqueueSnackbar('Mật khẩu đã được thay đổi thành công!', { variant: 'success', autoHideDuration: 4000 });
        })
        .catch((error) => {
          if (error.response) {

            enqueueSnackbar(`${error.response.data.message}`, {
              variant: 'error',
              autoHideDuration: 4000,
            });
          } else if (error.request) {
            enqueueSnackbar(
              `Không nhận được phản hồi từ máy chủ`, {
              variant: 'error',
              autoHideDuration: 4000
            });
          } else {
            enqueueSnackbar(`Lỗi gửi yêu cầu`, {
              variant: 'error',
              autoHideDuration: 4000,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField name="oldPassword" type="password" label="Mật khẩu cũ" />

          <RHFTextField
            name="newPassword"
            type="password"
            label="Mật khẩu mới"
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Mật khẩu phải tối thiểu 6 ký tự
              </Stack>
            }
          />
          <RHFTextField name="confirmNewPassword" type="password" label="Xác nhận mật khẩu mới" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Lưu thay đổi
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
