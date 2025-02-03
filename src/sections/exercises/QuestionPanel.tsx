import { Box, Button, Checkbox, FormControlLabel, Typography, Radio, RadioGroup } from '@mui/material';

export default function QuestionPanel() {
    return (
        <Box sx={{ flex: 1, paddingBottom: '16px' }}>
            <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}>
                <Typography variant="h6">Hướng dẫn làm bài</Typography>
                <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                    Mặc dù câu hỏi và lời giải đã được biên soạn và kiểm tra kỹ lưỡng nhưng trong quá trình thực hiện
                    có thể có sai sót. Mọi đóng góp ý kiến về nội dung và đáp án xin vui lòng comment ngay dưới đề thi hoặc inbox Fanpage. Xin trân trọng cảm ơn!
                </Typography>
            </Box>

            <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}>
                <Typography variant="subtitle1" gutterBottom>
                    Câu hỏi 1.
                </Typography>
                <Typography variant="body2">
                    Theo Luật cán bộ, công chức 2008, sửa đổi 2019 việc công chức đang giữ ngạch của ngành chuyên môn...
                </Typography>

                <RadioGroup>
                    <FormControlLabel value="A" control={<Radio />} label="Chuyển ngạch" />
                    <FormControlLabel value="B" control={<Radio />} label="Nâng ngạch" />
                    <FormControlLabel value="C" control={<Radio />} label="Bổ nhiệm" />
                    <FormControlLabel value="D" control={<Radio />} label="Cả 3 ý đều sai" />
                </RadioGroup>
            </Box>

            <FormControlLabel
                control={<Checkbox />}
                label="Tự động chuyển câu khi chọn xong đáp án"
            />

            <Box sx={{ marginTop: '16px' }}>
                <Button variant="contained" color="primary">
                    Kế tiếp
                </Button>
            </Box>
        </Box>
    );
}
