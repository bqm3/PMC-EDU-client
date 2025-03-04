import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { IKhoahoc, IVideoOnline } from 'src/@types/course';
import { useAuthContext } from '../../auth/useAuthContext';
// redux
import { useDispatch, useSelector } from '../../redux/store';

import { Box, Grid, Typography } from '@mui/material';
// sections
import { LessonVideo, LessonList } from 'src/sections/lesson';
import axios from 'axios';

export default function LearningPage() {
    const { user } = useAuthContext();
    const { name } = useParams();
    const location = useLocation();

    const tenkhoahoc = location.state?.Tenkhoahoc;

    const [firstCurrent, setFirstCurrent] = useState(false)
    const [diemDanhCheck, setDiemDanhCheck] = useState([]);
    const [videoKhoaHoc, setVideoKhoaHoc] = useState([]);
    const [currentVideo, setCurrentVideo] = useState<IVideoOnline>();
    const [currentKhoaHoc, setCurrentKhoaHoc] = useState<IKhoahoc>();

    const handleCheckKhoaHoc = async (name: string) => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        try {
            const response = await axios.post(
                `https://api.edu.pmcweb.vn/api/v1/diemdanh/khoa-hoc`,
                { SlugTenkhoahoc: name },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.data) {
                setDiemDanhCheck(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleListVideoKhoaHoc = async (name: string) => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        try {
            const response = await axios.get(`https://api.edu.pmcweb.vn/api/v1/khoahoc/detail/${name}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.data) {
                setVideoKhoaHoc(response.data.data?.dt_videoonlines);
                setCurrentKhoaHoc(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (name) {
            handleCheckKhoaHoc(name);
            handleListVideoKhoaHoc(name);
        }
    }, [name]);

    const handleVideoClick = async (item: any) => {
        setCurrentVideo(item);
    };

    const watchedVideos = new Set(diemDanhCheck?.map((dd: any) => dd.ID_Video));

    const [listVideo, setListVideo] = useState<any[]>([]);

    useEffect(() => {
        if (videoKhoaHoc) {
            const newList = videoKhoaHoc.map((item: any) => ({
                ...item,
                videos: item.videos
                    .map((it: any) => ({
                        ...it,
                        isWatch: watchedVideos.has(it.ID_Video),
                    }))
                    .sort((a: any, b: any) => a.Thutu - b.Thutu),
            }));
            setListVideo(newList); // Cập nhật danh sách video
        }
    }, [videoKhoaHoc, diemDanhCheck]);

    // Tìm video đầu tiên chưa xem
    useEffect(() => {
        if (!currentVideo && listVideo.length > 0) {
            const remainingVideos = listVideo
                .flatMap((item) => item.videos)
                .filter((video) => !video.isWatch)
                .sort((a, b) => b.Thutu - a.Thutu)[0];
            if (remainingVideos) {
                setCurrentVideo(remainingVideos);
            }
        }
    }, [listVideo, currentVideo]);

    return (
        <>
            <Helmet>
                <title>{currentVideo?.Tenvideo || `${tenkhoahoc}`}</title>
            </Helmet>

            <Grid container spacing={2} my={3.5} sx={{ alignItems: 'stretch' }}>
                <Grid item xs={12} md={8} lg={9} sx={{ minHeight: { md: '100vh' } }}>
                    <LessonVideo currentVideo={currentVideo} currentKhoaHoc={currentKhoaHoc} setFirstCurrent={setFirstCurrent} setListVideo={setListVideo} />
                    <Box sx={{ ml: 4, display: { xs: 'none', md: 'block' } }}>
                        <Typography>
                            Tham gia các cộng đồng để cùng học hỏi, chia sẻ xem PMC sắp có gì mới nhé!
                        </Typography>
                        <ul style={{ paddingLeft: '20px' }}>
                            <li>
                                <a
                                    href="https://www.facebook.com/pmcknowledge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#2986cc', textDecoration: 'none' }}
                                >
                                    Fanpage: https://www.facebook.com/pmcknowledge
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://www.youtube.com/@pmcknowledge2450"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#f44336', textDecoration: 'none' }}
                                >
                                    Youtube: https://www.youtube.com/@pmcknowledge2450
                                </a>
                            </li>
                        </ul>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4} lg={3} sx={{ minHeight: { md: '100vh' }, mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, mt: { xs: 0, md: 2 }, fontWeight: 'bold' }}>
                        Danh sách video khóa học
                    </Typography>
                    <LessonList
                        mergeListVideo={listVideo}
                        handleVideoClick={handleVideoClick}
                        currentVideo={currentVideo}
                    />
                </Grid>
            </Grid>
        </>
    );
}
