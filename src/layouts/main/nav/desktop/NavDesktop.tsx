// @mui
import { Button, Stack } from '@mui/material';
//
import { NavProps } from '../types';
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavDesktop({ isOffset, data }: NavProps) {
  return (
    <Stack component="nav" direction="row" spacing={2} sx={{ mr: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {data.map((link) => (
        link.isAuthButton && link.text == false ? (
          <Button
            key={link.title}
            variant={link.title === 'Đăng ký' ? 'contained' : 'text'}
            href={link.path}
            sx={{ ml: 0.5 }}
          >
            {link.title}
          </Button>
        ) : (
          <NavList key={link.title} item={link} isOffset={isOffset} />
        )
      ))}
    </Stack>
  );
}
