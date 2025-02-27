import { Box, Typography } from '@mui/material';
import React from 'react';

function QuestionHeader() {
    return (
        <Box
            sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', }}
        >
            <Typography variant="h6" color={'#2986cc'}>
                Hướng dẫn làm bài thi trắc nghiệm:
            </Typography>
            <Typography variant="body2" >
                1. Click vào nút{' '}
                <span style={{ color: '#2986cc', fontWeight: '700' }}>Bắt đầu làm bài</span> để tiến hành
                làm bài thi
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '4px' }}>
                2. Hết thời gian làm bài, hệ thống sẽ tự thu bài. Bạn có thể nộp bài trước khi thời gian kết
                thúc bằng cách ấn nút <span style={{ color: 'black', fontWeight: '700' }}>Nộp bài</span>
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                Mặc dù câu hỏi và lời giải đã được biên soạn và kiểm tra kỹ lưỡng nhưng trong quá trình thực
                hiện có thể có sai sót. Mọi đóng góp ý kiến về nội dung và đáp án xin vui lòng inbox Fanpage. Xin trân trọng cảm ơn!
            </Typography>
        </Box>
    );
}

export default QuestionHeader;
