import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
    disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({ disabledLink = false, sx, ...other }, ref) => {
        const theme = useTheme();
        const logo = (
            <Box
                ref={ref}
                component="div"
                sx={{
                    width: {
                        xs: 40,
                        md: 50,
                    },
                    height: {
                        xs: 30,
                        md: 35,
                    },
                    display: 'inline-flex',
                    ...sx,
                }}
                {...other}
            >
                <img style={{ objectFit: 'cover' }} src={`${process.env.PUBLIC_URL}/favicon/favicon-logo-pmc.png`} alt="PMC Knowledge" />
            </Box>

        );

        if (disabledLink) {
            return <>{logo}</>;
        }

        return (
            <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
                {logo}
            </Link>
        );
    }
);

export default Logo;
