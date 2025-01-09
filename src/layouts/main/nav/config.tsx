// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Danh mục',
    icon: <Iconify icon="ic:round-grain" />,
    // path: PATH_PAGE.components,
    path: '#',
    children: [
      {
        subheader: '',
        items: [
          { title: 'Orientation', path: '/#', },
          { title: 'Quản lý tài chính kế toán', path: '/#', },
        ],
      },
    ],
  },
  {
    title: 'Cơ hội nghề nghiệp',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/#',
    isAuthButton: true,
    text: true
  },
  {
    title: 'Đào tạo kép',
    icon: <Iconify icon="ic:round-grain" />,
    path: '/#',
    isAuthButton: true,
    text: true
  },

  // {
  //   title: 'Đối tác đào tạo',
  //   path: '/pages',
  //   icon: <Iconify icon="eva:file-fill" />,
  //   children: [
  //     {
  //       subheader: 'Other',
  //       items: [
  //         { title: 'About us', path: PATH_PAGE.about },
  //         { title: 'Contact us', path: PATH_PAGE.contact },
  //         { title: 'FAQs', path: PATH_PAGE.faqs },
  //         { title: 'Pricing', path: PATH_PAGE.pricing },
  //         { title: 'Payment', path: PATH_PAGE.payment },
  //         { title: 'Maintenance', path: PATH_PAGE.maintenance },
  //         { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
  //       ],
  //     },
  //     {
  //       subheader: 'Authentication',
  //       items: [
  //         { title: 'Login', path: PATH_AUTH.loginUnprotected },
  //         { title: 'Register', path: PATH_AUTH.registerUnprotected },
  //         { title: 'Reset password', path: PATH_AUTH.resetPassword },
  //         { title: 'Verify code', path: PATH_AUTH.verify },
  //       ],
  //     },
  //     {
  //       subheader: 'Error',
  //       items: [
  //         { title: 'Page 403', path: PATH_PAGE.page403 },
  //         { title: 'Page 404', path: PATH_PAGE.page404 },
  //         { title: 'Page 500', path: PATH_PAGE.page500 },
  //       ],
  //     },
  //     {
  //       subheader: 'Dashboard',
  //       items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
  //     },
  //   ],
  // },
  {
    title: 'Đối tác đào tạo',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: '/#',
    isAuthButton: true,
    text: true
  },
  {
    title: 'Đăng ký',
    icon: <Iconify icon="eva:edit-fill" />,
    path: PATH_AUTH.register,
    isAuthButton: true, // Đánh dấu là nút đăng ký
    text: false
  },
  {
    title: 'Đăng nhập',
    icon: <Iconify icon="eva:person-fill" />,
    path: PATH_AUTH.login,
    isAuthButton: true, // Đánh dấu là nút đăng nhập
    text: false
  },
];

export default navConfig;
