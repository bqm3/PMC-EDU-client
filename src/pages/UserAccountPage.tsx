import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../_mock/arrays';
// components
import Iconify from '../components/iconify';
import { useSettingsContext } from '../components/settings';
// sections
import {
  AccountGeneral,
  AccountChangePassword,
} from '../sections/user/account';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'Thông tin',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    // {
    //   value: 'billing',
    //   label: 'Billing',
    //   icon: <Iconify icon="ic:round-receipt" />,
    //   component: (
    //     <AccountBilling
    //       cards={_userPayment}
    //       addressBook={_userAddressBook}
    //       invoices={_userInvoices}
    //     />
    //   ),
    // },
    // {
    //   value: 'notifications',
    //   label: 'Notifications',
    //   icon: <Iconify icon="eva:bell-fill" />,
    //   component: <AccountNotifications />,
    // },
    // {
    //   value: 'social_links',
    //   label: 'Social links',
    //   icon: <Iconify icon="eva:share-fill" />,
    //   component: <AccountSocialLinks socialLinks={_userAbout.socialLinks} />,
    // },
    {
      value: 'change_password',
      label: 'Đổi mật khẩu',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Trang cá nhân</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ marginY: 10 }}>
        {/* <CustomBreadcrumbs
          heading="Account"
          links={[
            // { name: 'User', href: PATH_PAGE.user.root },
            { name: 'Account Settings' },
          ]}
        /> */}

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 2 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
