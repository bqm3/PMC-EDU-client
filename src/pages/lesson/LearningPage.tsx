import { Helmet } from 'react-helmet-async';

import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack } from '@mui/material';
// sections
import Login from '../../sections/auth/Login';
import {
    LessonVideo,
    LessonList
} from 'src/sections/lesson';
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LearningPage() {
    return (
        <>
            <Helmet>
                <title> {"Khái niệm kỹ thuật cần biết"}</title>
            </Helmet>

            <Grid container spacing={2} my={3}>
                <Grid item xs={12} md={6} lg={9}>
                    <LessonVideo />
                </Grid>

                <Grid item xs={12} md={6} lg={3} sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                    <Typography variant='subtitle1' sx={{ my: 2, fontWeight: 'bold' }}>Nội dung khóa học</Typography>
                    <LessonList />
                </Grid>
            </Grid>
        </>
    );
}
