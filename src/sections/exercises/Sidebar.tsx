import { Box, Button, Typography } from '@mui/material';

export default function Sidebar() {
    return (
        <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="h5" color="green" gutterBottom>
                Đề thi trắc nghiệm Kiến thức chung số 60 free
            </Typography>
            <Typography variant="body1" fontWeight={"500"} fontSize={18}>Số câu: 60</Typography>
            <Typography variant="subtitle1" fontWeight={"500"} fontSize={18}>Thời gian: 60 phút</Typography>

            <Box sx={{ marginTop: '16px' }}>
                <Button variant="contained" color="success" fullWidth>
                    Lưu đề thi
                </Button>
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '8px' }}>
                    Bắt đầu làm bài
                </Button>
                <Button variant="contained" color="error" fullWidth sx={{ marginTop: '8px' }}>
                    Thoát ra ngoài
                </Button>
            </Box>

            {/* <Box sx={{ marginTop: '32px' }}>
                <Typography variant="subtitle1">Chia sẻ lên</Typography>
                <Button variant="text" color="primary">Facebook</Button>
                <Button variant="text" color="primary">Twitter</Button>
            </Box> */}
        </Box>
    );
}
