import { Box, Typography } from '@mui/material'
import React from 'react'

function QuestionHeader() {
    return (
        <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}>
            <Typography variant="h6">Hướng dẫn làm bài</Typography>
            <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                Mặc dù câu hỏi và lời giải đã được biên soạn và kiểm tra kỹ lưỡng nhưng trong quá trình thực hiện
                có thể có sai sót. Mọi đóng góp ý kiến về nội dung và đáp án xin vui lòng comment ngay dưới đề thi hoặc inbox Fanpage. Xin trân trọng cảm ơn!
            </Typography>
        </Box>
    )
}

export default QuestionHeader