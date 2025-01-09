import { useState } from 'react';
import sumBy from 'lodash/sumBy';
import { styled } from '@mui/material/styles';
// @mui
import {
    Grid,
    Divider,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    Rating,
    Button,
    LinearProgress,
    Stack,
    Box,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// utils
import { fShortenNumber } from '../../utils/formatNumber';
// @types
import { IProduct } from '../../@types/product';
// components
import Iconify from '../../components/iconify';
// _mock_
import { _faqs } from '../../_mock/arrays';

import ReactPlayer from 'react-player';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const lessons = [
    {
        id: 1,
        stt: 1,
        title: '1. Khái niệm kỹ thuật cần biết',
        count: 3,
        timeAll: '23:09',
        data: [
            {
                stt: 1,
                title: '1. Mô hình Client - Server là gì?',
                time: '11:35',
            },
            {
                stt: 2,
                title: '2. Công dụng dụng của Client - Server',
                time: '10:34',
            },
            {
                stt: 3,
                title: '3. Phân tích và triển khai phần mềm',
                time: '01:00',
            },
        ],
    },
    {
        id: 2,
        stt: 2,
        title: '2. Mô hình, con người IT',
        count: 3,
        timeAll: '01:46:14',
        data: [
            {
                stt: 1,
                title: '4. Học IT cần tố chất gì? Góc nhìn khác từ các chuyên gia định hướng giáo dục',
                time: '11:35',
            },
            {
                stt: 2,
                title: '5. Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
                time: '10:34',
            },
            {
                stt: 3,
                title: '6. Trải nghiệm thực tế sau 2 tháng làm việc tại doanh nghiệp của học viên PMC',
                time: '01:00',
            },
        ],
    },
];

export default function LessonList() {
    const [openReview, setOpenReview] = useState(false);

    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setShow(true);
    };

    const handleOpenReview = () => {
        setOpenReview(true);
    };

    const handleCloseReview = () => {
        setOpenReview(false);
    };

    return (
        <>
            <Stack
                sx={{
                    width: '100%',
                    pr: 1,
                }}
            >
                {lessons.map((lesson, index) => (
                    <Accordion key={lesson.id} sx={{ backgroundColor: '#fff', marginBottom: '8px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '0px',
                                // padding: '4px 8px',
                                borderBottom: '1px solid gray',
                            }}
                        >
                            <Grid alignItems="center">
                                <Typography variant="subtitle1">{lesson.title}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    0/{lesson.count} | {lesson.timeAll}
                                </Typography>
                            </Grid>
                        </AccordionSummary>
                        {lesson.data.map((item, index) => (
                            <AccordionDetails sx={{ padding: '8px', ml: 2 }} key={item.stt}>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {item.time}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        ))}
                    </Accordion>
                ))}
            </Stack>
            {/* <BootstrapDialog
        maxWidth="lg"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <ReactPlayer height={400} width={"100%"} playing={false} controls={true} url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
            {/* <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            pt: { xs: 5, md: 0 },
            pb: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Average rating
          </Typography>

          <Typography variant="h2">{totalRating}/5</Typography>

          <Rating readOnly value={totalRating} precision={0.1} />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReview)} reviews)
          </Typography>
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            p: 3,
            py: { md: 5 },
            borderLeft: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
            borderRight: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
          }}
        >
          {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={total} />
            ))}
        </Stack>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: { xs: 3, md: 0 },
            pb: { xs: 5, md: 0 },
          }}
        >
          <Button
            color="inherit"
            size="large"
            onClick={handleOpenReview}
            variant="outlined"
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Write your review
          </Button>
        </Stack>
      </Box>

      <Divider />

      <ProductDetailsReviewList reviews={product.reviews} />

      <ProductDetailsReviewNewDialog open={openReview} onClose={handleCloseReview} /> */}
        </>
    );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
    star: {
        name: string;
        starCount: number;
        reviewCount: number;
    };
    total: number;
};

function ProgressItem({ star, total }: ProgressItemProps) {
    const { name, starCount, reviewCount } = star;

    return (
        <Stack direction="row" alignItems="center">
            <Typography variant="subtitle2" sx={{ width: 42 }}>
                {name}
            </Typography>

            <LinearProgress
                color="inherit"
                variant="determinate"
                value={(starCount / total) * 100}
                sx={{
                    mx: 2,
                    flexGrow: 1,
                }}
            />

            <Typography
                variant="body2"
                sx={{
                    minWidth: 48,
                    color: 'text.secondary',
                }}
            >
                {fShortenNumber(reviewCount)}
            </Typography>
        </Stack>
    );
}
