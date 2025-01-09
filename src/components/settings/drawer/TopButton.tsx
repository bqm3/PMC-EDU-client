// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Tooltip, Box } from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
// utils
import { bgBlur } from '../../../utils/cssStyles';
//
import { IconButtonAnimate } from '../../animate';
import SvgColor from '../../svg-color';
//
import BadgeDot from './BadgeDot';

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onToggle: VoidFunction;
};

export default function TopButton({ open, onToggle }: Props) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 0.5,
                right: 24,
                bottom: 84,
                zIndex: 999,
                position: 'fixed',
                borderRadius: '50%',
                boxShadow: `-12px 12px 32px -4px ${alpha(
                    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
                    0.36
                )}`,
                ...bgBlur({ color: theme.palette.background.default }),
            }}
        >

            <Tooltip title="Top">
                <IconButtonAnimate color="primary" onClick={onToggle} sx={{ p: 1.25 }}>
                    <KeyboardArrowUpRoundedIcon />
                </IconButtonAnimate>
            </Tooltip>
        </Box>
    );
}
