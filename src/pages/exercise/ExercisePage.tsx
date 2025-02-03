import { Helmet } from 'react-helmet-async';
import { Box, Grid, Container } from '@mui/material';
import { Sidebar, QuestionPanel, QuestionNavigation } from 'src/sections/exercises';

// ----------------------------------------------------------------------

export default function ExercisePage() {
    return (
        <>
            <Helmet>
                <title>{"An toàn, Vệ sinh lao động ngành Vệ sinh công nghiệp"}</title>
            </Helmet>

            {/* Bao bọc nội dung trong Container */}
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={12} md={9} lg={9} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <QuestionPanel />
                        <QuestionNavigation />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
