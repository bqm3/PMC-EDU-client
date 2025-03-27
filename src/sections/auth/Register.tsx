import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegisterForm';
import AuthPrivacyPolicy from './AuthPrivacyPolicy';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Học tập tốt hơn với PMC Knowledge">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Đăng ký tài khoản</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Bạn đã có tài khoản? </Typography>

          <Link to={PATH_AUTH.login} component={RouterLink} variant="subtitle2">
            Đăng nhập
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <AuthPrivacyPolicy />
    </LoginLayout>
  );
}
