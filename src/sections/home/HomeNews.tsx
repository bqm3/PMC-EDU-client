import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import {
    Box,
    Paper,
    AppBar,
    Drawer,
    Button,
    Toolbar,
    Divider,
    ListItemButton,
    Typography,
    Container,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import TextMaxLine from '../../components/text-max-line';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
    {
        label: 'Hợp tác chiến lược giữa Trường Đại học Thủy lợi với doanh nghiệp hàng đầu với PMC',
        title: 'Managing your account',
        image: 'https://www.tlu.edu.vn/Portals/0/2019/thang10/pmc5.jpg',
        href: 'https://www.tlu.edu.vn/tin-tuc-dai-hoc-thuy-loi/hop-tac-chien-luoc-giua-truong-dai-hoc-10590',
    },
    {
        label: 'Ký kết hợp tác giữa Học viện phụ nữ và Công ty CMT và PMC',
        image: 'https://vccinews.vn/upload/photos/2022/8/large/vbf-2022830111045cgw.jpg',
        href: 'https://www.vccinews.vn/news/44420/ky-ket-hop-tac-giua-hoc-vien-phu-nu-va-cong-ty-gmt-va-pmc.html',
    },
    {
        label: 'Trường Cao đẳng Bán công Công nghệ và Quản trị doanh nghiệp (CTIM)...',
        image: 'https://ctim.edu.vn/uploads/images/T10_2019/162132_8ce2cde8f48012de4b91.jpg',
        href: 'https://ctim.edu.vn/truong-cao-dang-ban-cong-cong-nghe-va-quan-tri-doanh-nghiep-ctim-da-co-buoi--7116062843.html',
    },
];

// ----------------------------------------------------------------------

export default function HomeNews() {
    const isDesktop = useResponsive('up', 'md');

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // if (!isDesktop) {
    //     return (
    //         <>
    //             <AppBar position="absolute" color="transparent" sx={{ boxShadow: 0 }}>
    //                 <Toolbar sx={{ justifyContent: 'flex-end' }}>
    //                     <Button
    //                         variant="soft"
    //                         startIcon={<Iconify icon="eva:menu-2-fill" />}
    //                         onClick={handleOpen}
    //                     >
    //                         Categories
    //                     </Button>
    //                 </Toolbar>
    //                 <Divider />
    //             </AppBar>

    //             <Drawer open={open} onClose={handleClose}>
    //                 <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 1 }}>
    //                     {CATEGORIES.map((category) => (
    //                         <CardMobile key={category.label} category={category} />
    //                     ))}
    //                 </Box>
    //             </Drawer>
    //         </>
    //     );
    // }

    return (
        <Container component={MotionViewport} sx={{ pb: 10, }}>

            <m.div variants={varFade().inUp}>
                <Typography variant="h2" sx={{ my: 3, textAlign: 'center' }}>
                    Tin Tức
                </Typography>
            </m.div>

            <Box
                gap={2.5}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
            >

                {CATEGORIES.map((category) => (
                    <m.div key={category.label} variants={varFade().in}>
                        <CardDesktop category={category} />
                    </m.div>
                ))}
            </Box>
        </Container>
    );
}

// ----------------------------------------------------------------------

type CardProps = {
    category: {
        label: string,
        title?: string,
        image: string,
        href: string,
    };
};

function CardDesktop({ category }: CardProps) {
    const { label, title, image, href } = category;

    return (
        <Paper
            component="a"
            href={href}
            target="_blank" // Mở link trong tab mới
            rel="noopener noreferrer" // Bảo mật khi mở tab mới
            sx={{
                textDecoration: 'none', // Bỏ gạch chân
                '&:hover': {
                    boxShadow: (theme) => theme.customShadows.z24,
                },
            }}
        >
            <Image
                disabledEffect
                alt={image}
                src={image}
                sx={{ mx: 'auto', minHeight: '200px', maxHeight: "200px", mb: 1 }}
            />

            <TextMaxLine variant="body1" sx={{ fontWeight: "bold", mb: 1 }} persistent>
                {label}
            </TextMaxLine>
            <Typography variant='caption'>
                {title}
            </Typography>
        </Paper>
    );
}

// ----------------------------------------------------------------------

function CardMobile({ category }: CardProps) {
    const { label, title, image, href } = category;

    return (
        <ListItemButton
            key={label}
            sx={{
                py: 2,
                maxWidth: 140,
                borderRadius: 1,
                textAlign: 'center',
                typography: 'body2',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: 'background.neutral',
            }}
        >
            <Image alt={image} src={image} sx={{ width: 48, height: 48, mb: 1 }} />
            {category.label}
        </ListItemButton>
    );
}
