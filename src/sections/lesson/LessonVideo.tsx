import { Box, Stack, Typography, Grid } from '@mui/material';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import VideoPlayer from './VideoPlayer';
import axios from '../../utils/axios';
import { IKhoahoc } from 'src/@types/course';

type Props = {
    currentVideo: any,
    currentKhoaHoc?: IKhoahoc
    setListVideo: any
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

export default function LessonVideo({ currentVideo, currentKhoaHoc, setListVideo }: Props) {

    const handleVideoWatched = async (ID_Lophoc: any, ID_Lichhoc: any, startTime: string, endTime: string, currentTimeStr: string) => {

        if (!currentVideo?.isWatch) {
            try {
                await axios.post(`/api/v1/lophoc/watch-diem-danh/${ID_Lophoc}/${ID_Lichhoc}`, {
                    Giora: startTime,
                    Giovao: endTime,
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
                        isWatch: item.ID_Lichhoc === ID_Lichhoc ? true : item.isWatch
                    }));

                    // Kiểm tra xem còn video nào chưa xem không
                    const allVideosWatched = updatedList.every((item: any) => item.isWatch)


                    if (allVideosWatched) {
                        handleCourseCompleted(ID_Lophoc);
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
    const handleCourseCompleted = async (ID_Lophoc: string) => {
        try {
            await axios.post(`/api/v1/hocvien/completed`, {
                ID_Lophoc: ID_Lophoc
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((res) => {
                    console.log('Hoàn thành khóa học', res);
                })
                .catch((error) => {
                    console.error('Lỗi khi xác nhận hoàn thành khóa học', error);
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
                    m: {
                        xs: 2,
                        md: 4,
                    },
                }}
            >
                <Stack >
                    <Typography variant="h4">{currentVideo?.Tieude}</Typography>
                    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: currentVideo?.Noidung }} />
                </Stack>
            </Box>
        </>
    );
}
