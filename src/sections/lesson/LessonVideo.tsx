import { Box, Stack, Typography, Grid } from '@mui/material';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import VideoPlayer from './VideoPlayer';
import axios from 'axios';
import { IKhoahoc } from 'src/@types/course';

type Props = {
    currentVideo: any,
    currentKhoaHoc?: IKhoahoc
    setFirstCurrent: any
    setListVideo: any
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

export default function LessonVideo({ currentVideo, currentKhoaHoc, setFirstCurrent, setListVideo }: Props) {

    const handleVideoWatched = async (videoId: any, startTime: string, endTime: string, currentTimeStr: string) => {

        if (!currentVideo?.isWatch) {
            try {
                await axios.post(`http://localhost:7676/api/v1/diemdanh/${videoId}`, {
                    startTime: startTime,
                    endTime: endTime,
                    ID_Khoahoc: currentKhoaHoc?.ID_Khoahoc,
                    MaKh: currentKhoaHoc?.SlugTenkhoahoc,
                    iXacnhan: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Cập nhật danh sách video
                setListVideo((prevList: any) => {
                    const updatedList = prevList.map((item: any) => ({
                        ...item,
                        videos: item.videos.map((video: any) =>
                            video.ID_Video === currentVideo.ID_Video
                                ? { ...video, isWatch: true }
                                : video
                        ),
                    }));

                    // Kiểm tra xem còn video nào chưa xem không
                    const allVideosWatched = updatedList.every((item: any) =>
                        item.videos.every((video: any) => video.isWatch)
                    );

                    if (allVideosWatched) {
                        handleCourseCompleted();
                    }

                    return updatedList;
                });

                // setFirstCurrent(false);
            } catch (error) {
                console.error('Error watching video', error);
            }
        }
    };

    // ✅ Gửi API khi hoàn thành tất cả video
    const handleCourseCompleted = async () => {
        try {
            await axios.post(`http://localhost:7676/api/v1/hocvien/completed`, {
                ID_Khoahoc: currentKhoaHoc?.ID_Khoahoc
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

        } catch (error) {
            console.error('Lỗi khi xác nhận hoàn thành khóa học', error);
        }
    };


    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'black',
                    justifyItems: 'center',
                }}
            >
                <VideoPlayer video={currentVideo} onVideoWatched={handleVideoWatched} />
            </Box>
            <Box
                sx={{
                    // justifyItems: 'center',
                    m: {
                        xs: 2,
                        md: 4,
                    },
                }}
            >
                <Stack >
                    <Typography variant="h4">{currentVideo?.Tenvideo}</Typography>
                    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: currentVideo?.Noidungtt }} />
                </Stack>
            </Box>
        </>
    );
}
