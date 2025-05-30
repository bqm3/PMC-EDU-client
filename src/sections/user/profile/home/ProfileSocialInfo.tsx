// @mui
import { Link, Card, CardHeader, Stack } from '@mui/material';
// _mock
import { _socials } from '../../../../_mock/arrays';
// @types
import { IUserSocialLink } from '../../../../@types/user';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  socialLinks: IUserSocialLink;
};

export default function ProfileSocialInfo({ socialLinks }: Props) {
  const { facebookLink, linkedinLink, twitterLink } = socialLinks;

  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link: any) => (
          <Stack key={link.name} direction="row" sx={{ wordBreak: 'break-all' }}>
            <Iconify
              icon={link.icon}
              sx={{
                mr: 2,
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link component="span" variant="body2" color="text.primary">
              {(link.value === 'facebook' && facebookLink) ||
                (link.value === 'linkedin' && linkedinLink) ||
                twitterLink}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
