import { Box, Button, Typography } from '@mui/material';

export default function QuestionNavigation() {
    return (
        <Box sx={{ padding: '16px', borderTop: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Array.from({ length: 60 }).map((_, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        sx={{ width: '40px', height: '30px' }}
                    >
                        <Typography sx={{ fontSize: 10 }}> Câu {index + 1}</Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
