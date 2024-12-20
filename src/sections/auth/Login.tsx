import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Logo style={{ alignSelf: 'center' }} />

      <Stack spacing={2} mt={2}>
        <AuthLoginForm />
      </Stack>
      <Stack direction="row" spacing={1} pt={2}>
        <Typography variant="body2">Bạn không có tài khoản?</Typography>

        <Link to={PATH_AUTH.register} component={RouterLink} variant="subtitle2">
          Tạo tài khoản mới
        </Link>
      </Stack>
      <AuthWithSocial />
    </LoginLayout>
  );
}
