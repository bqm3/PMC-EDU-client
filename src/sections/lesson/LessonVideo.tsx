import { Box, Stack, Typography, Grid } from '@mui/material';
import React from 'react';

import ReactPlayer from 'react-player';

export default function LessonVideo() {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'black',
                    justifyItems: 'center',
                }}
            >
                <ReactPlayer
                    height={600}
                    width={'90%'}
                    playing={false}
                    controls={true}
                    url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                />
            </Box>
            <Box
                sx={{
                    justifyItems: 'center',
                    mt: 4,
                }}
            >
                <Stack width={'90%'}>
                    <Typography variant="h4">Mô hình Client - Server là gì?</Typography>
                    <Typography variant="body1">Cập nhật tháng 11 năm 2022</Typography>

                    <Box sx={{ mt: 4 }}>
                        <Typography>
                            Tham gia các cộng đồng để cùng học hỏi, chia sẻ xem PMC sắp có gì mới nhé!
                        </Typography>
                        <ul style={{ paddingLeft: '20px' }}>
                            <li>
                                <a
                                    href="https://www.facebook.com/pmcknowledge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }} // Giữ màu chữ theo thiết lập của `li`
                                >
                                    Fanpage: https://www.facebook.com/pmcknowledge
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/pmcknowledge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    Group: https://www.facebook.com/pmcknowledge
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/pmcknowledge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    Youtube: https://www.facebook.com/pmcknowledge
                                </a>
                            </li>
                        </ul>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}
