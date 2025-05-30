import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { IBaiThi, IHocvien, IKhoahoc, ILichhoc } from 'src/@types/course';

import { useDispatch, useSelector } from '../../redux/store';
import { Box, Grid, Typography } from '@mui/material';
// sections
import { LessonVideo, LessonList } from 'src/sections/lesson';
import axios from '../../utils/axios';
import { getUsersCourse } from 'src/redux/slices/course';

export default function LearningPage() {
    const { name } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user_courses } = useSelector((state) => state.course);
    const [hocVien, setHocVien] = useState<IHocvien | null>(null);
    const lophoc = location.state?.lophoc;
    const periodSlug = searchParams.get('period');

    useEffect(() => {
        if (user_courses && name) {
            const hocVienDefault = user_courses.find(
                (item) => item?.dt_lophoc?.Malop === name
            ) || {} as IHocvien;

            setHocVien(hocVienDefault);
        }
    }, [user_courses, name]);

    const [diemDanhCheck, setDiemDanhCheck] = useState([]);
    const [videoKhoaHoc, setVideoKhoaHoc] = useState([]);
    const [currentVideo, setCurrentVideo] = useState<ILichhoc | null>();
    const [currentKhoaHoc, setCurrentKhoaHoc] = useState<IKhoahoc>();
    const [listVideo, setListVideo] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getUsersCourse());
    }, [dispatch]);

    const handleCheckKhoaHoc = async (name: string) => {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        try {
            const response = await axios.get(
                `/api/v1/lophoc/hoc-vien/diem-danh/${name}`,
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

                // setListBaiThi(response.data.data?.baithi_list || []);
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
        setCurrentVideo(null);

        if (selectedVideo.Slug) {
            searchParams.set('period', selectedVideo.Slug);
            setSearchParams(searchParams);
        }

        setTimeout(() => {
            setCurrentVideo(selectedVideo);
        }, 100);
    };

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
        if (!currentVideo && listVideo.length > 0 && periodSlug) {
            const video = listVideo.find(
                (video) => video.Slug === periodSlug && !video.isWatch
            );

            if (video) {
                setCurrentVideo(video);
            }
        }
    }, [listVideo, currentVideo, periodSlug]);


    return (
        <>
            <Helmet>
                <title>{currentVideo?.Tieude || `${lophoc}`}</title>
            </Helmet>
            <Grid
                container
                spacing={2}
                sx={{
                    height: 'calc(100vh - 64px)', // Full viewport height
                    overflow: 'hidden', // Prevent page-level scrolling
                    display: 'flex', // Ensure proper flex behavior
                    mt: 2
                }}
            >
                {/* Left Column: Video */}
                <Grid
                    item
                    xs={12}
                    md={8}
                    lg={9}
                    sx={{
                        height: { xs: '50%', md: '100%' }, // Half height on mobile, full on desktop
                        overflowY: 'auto', // Independent scrolling
                        pr: { md: 2 }, // Padding-right only on desktop

                        display: 'flex',
                        flexDirection: 'column', // Stack content vertically
                    }}
                >
                    <LessonVideo
                        currentVideo={currentVideo}
                        currentKhoaHoc={currentKhoaHoc}
                        setListVideo={setListVideo}
                    />
                    <Box sx={{ ml: 4, display: { md: 'block', mb: 2 }, flexShrink: 0 }}>
                        <Typography>
                            Tham gia các cộng đồng để cùng học hỏi, chia sẻ xem PMC sắp có gì mới nhé!
                        </Typography>
                        <ul style={{ paddingLeft: '20px' }}>
                            <li>
                                <a
                                    href="https://www.facebook.com/pmcknowledge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#2986cc', textDecoration: 'none', fontWeight: 600 }}
                                >
                                    Fanpage: https://www.facebook.com/pmcknowledge
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/@pmcknowledge2450"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#f44336', textDecoration: 'none', fontWeight: 600 }}
                                >
                                    Youtube: https://www.youtube.com/@pmcknowledge2450
                                </a>
                            </li>
                        </ul>
                    </Box>
                </Grid>

                {/* Right Column: Lesson List */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{
                        height: { xs: '50%', md: '100%' }, // Half height on mobile, full on desktop
                        overflowY: 'auto', // Independent scrolling
                        pl: { md: 2 }, // Padding-left only on desktop
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 2, mt: { xs: 0, md: 2 }, fontWeight: 'bold', flexShrink: 0 }}
                    >
                        Danh sách video lớp học
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1, // Take remaining space
                            overflowY: 'auto', // Scrollable content
                            pr: 1,
                        }}
                    >
                        <LessonList
                            hocVien={hocVien}
                            mergeListVideo={listVideo}
                            handleVideoClick={handleVideoClick}
                            currentVideo={currentVideo}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
