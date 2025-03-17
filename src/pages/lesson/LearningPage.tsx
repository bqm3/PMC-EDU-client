import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { IKhoahoc, ILichhoc, IVideoOnline } from 'src/@types/course';
import { useAuthContext } from '../../auth/useAuthContext';
// redux
import { useDispatch, useSelector } from '../../redux/store';

import { Box, Grid, Typography } from '@mui/material';
// sections
import { LessonVideo, LessonList } from 'src/sections/lesson';
import axios from '../../utils/axios';

export default function LearningPage() {
    const { user } = useAuthContext();
    const { name } = useParams();
    const location = useLocation();

    const lophoc = location.state?.lophoc;

    const [firstCurrent, setFirstCurrent] = useState(false)
    const [diemDanhCheck, setDiemDanhCheck] = useState([]);
    const [videoKhoaHoc, setVideoKhoaHoc] = useState([]);
    const [currentVideo, setCurrentVideo] = useState<ILichhoc | null>();
    const [currentKhoaHoc, setCurrentKhoaHoc] = useState<IKhoahoc>();

    const handleCheckKhoaHoc = async (name: string) => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        try {
            const response = await axios.get(
                `/api/v1/lophoc/hoc-vien/diem-danh/${name}`,
                // { SlugTenkhoahoc: name },
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
            const response = await axios.get(`/api/v1/lophoc/detail/${name}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.data) {
                setVideoKhoaHoc(response.data.data?.dt_lichhocs);
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

    const handleVideoClick = (selectedVideo: any) => {
        setCurrentVideo(null); // Đặt currentVideo thành null để reset trạng thái
        setTimeout(() => {
            setCurrentVideo(selectedVideo);
        }, 100); // Đợi một chút để React cập nhật lại component
    };




    const [listVideo, setListVideo] = useState<any[]>([]);

    useEffect(() => {

        const watchedVideos = new Set(
            diemDanhCheck.map((dd: any) => dd.ID_Lichhoc).filter((id) => id !== null && id !== undefined)
        );

        if (Array.isArray(videoKhoaHoc)) {
            const newList = videoKhoaHoc.map((item: any) => ({
                ...item,
                isWatch: watchedVideos.has(item.ID_Lichhoc)

            })).sort((a: any, b: any) => a.ID_Tiethoc - b.ID_Tiethoc);

            setListVideo(newList);
        }
    }, [diemDanhCheck, videoKhoaHoc]);

    useEffect(() => {
        if (!currentVideo && listVideo.length > 0) {
            const remainingVideos = listVideo
                .filter((video) => !video.isWatch) // Chỉ lấy video chưa xem
                .sort((a, b) => a.ID_Tiethoc - b.ID_Tiethoc)[0];

            if (remainingVideos) {
                setCurrentVideo(remainingVideos);
            }
        }
    }, [listVideo]); // Xóa `currentVideo` khỏi dependency để tránh mất trạng thái


    return (
        <>
            <Helmet>
                <title>{currentVideo?.Tieude || `${lophoc}`}</title>
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
                        Danh sách video lớp học
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
