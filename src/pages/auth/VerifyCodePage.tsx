import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthVerifyCodeForm from '../../sections/auth/AuthVerifyCodeForm';
// assets
import { EmailInboxIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Helmet>
        <title>Xác thực tài khoản</title>
      </Helmet>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Kiểm tra mail của bạn
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Chúng tôi đã gửi email mã xác nhận 6 chữ số, vui lòng nhập mã vào bên dưới để xác minh email của bạn.
      </Typography>

      <AuthVerifyCodeForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Không nhận được code? &nbsp;
        <Link variant="subtitle2">Gửi lại</Link>
      </Typography>

      <Link
        to={PATH_AUTH.login}
        component={RouterLink}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Quay trở lại đăng nhập
      </Link>
    </>
  );
}
