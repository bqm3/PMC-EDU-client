import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { PATH_AUTH } from 'src/routes/paths';
// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFCodes } from '../../components/hook-form';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

export default function AuthVerifyCodeForm() {
  const navigate = useNavigate();
  const { verify } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Mã là bắt buộc'),
    code2: Yup.string().required('Mã là bắt buộc'),
    code3: Yup.string().required('Mã là bắt buộc'),
    code4: Yup.string().required('Mã là bắt buộc'),
    code5: Yup.string().required('Mã là bắt buộc'),
    code6: Yup.string().required('Mã là bắt buộc'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const verificationCode = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`;

    try {
      if (verify) {
        await verify(verificationCode, 'REGISTER_ACCOUNT');
      }
      navigate(PATH_AUTH.login)
      enqueueSnackbar('Tài khoản đã xác thực thành công! Vui lòng đăng nhập', {
        variant: 'success',
        autoHideDuration: 5000,
      });

      navigate(PATH_DASHBOARD.root);
    } catch (error) {
      enqueueSnackbar('Tài khoản xác thực không thành công! Vui lòng thử lại', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
            <FormHelperText error sx={{ px: 2 }}>
              Mã là bắt buộc
            </FormHelperText>
          )}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Xác thực
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
