import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { useSettingsContext } from '../components/settings';
import { SkeletonProductDetails } from '../components/skeleton';

// sections
import {
  CourseDetailsSummary,
  CourseDetailsReview,
  CourseDetailsAdd,
} from '../sections/courses/details';
import { getDetailKhoaHoc } from 'src/redux/slices/course';
import { ILophoc } from 'src/@types/course';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function CourseDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const dispatch = useDispatch();

  const { course, isLoading } = useSelector((state) => state.course);

  const [checkCourse, setCheckCourse] = useState();

  useEffect(() => {
    if (name) {
      dispatch(getDetailKhoaHoc(name as string));
    }
  }, [dispatch, name]);

  function convertToTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} tiếng ${remainingMinutes} phút`;
  }

  const [logs, setLogs] = useState<any>(course?.dt_lichhocs);
  const [expandedAccordions, setExpandedAccordions] = useState<any>([]);

  useEffect(() => {
    setLogs(course?.dt_lichhocs);
  }, [course]);

  const handleCheckKhoaHoc = async (course: ILophoc) => {
    if (!course) return;

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    await axios.put(
      `http://localhost:7676/api/v1/hocvien/khoahoc/${course?.ID_Khoahoc}`,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      }
    ).then((response) => {
      setCheckCourse(response.data);
    }).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    if (course) {
      handleCheckKhoaHoc(course);
    }
  }, [course]);




  const expandAll = () => {
    const newArray: any = [];
    if (!(expandedAccordions.length > 0)) {
      logs.forEach((log: any, index: number) => newArray.push(index));
      setExpandedAccordions(newArray);
    } else {
      setExpandedAccordions([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`PMC Knowledge - ${course?.Tenlop || ''}`}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ marginY: 10 }}>
        {course && (
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                p: (theme) => ({
                  md: theme.spacing(2, 5, 0, 2),
                }),
              }}
            >
              <CourseDetailsSummary course={course} />
              <Stack
                sx={{
                  gap: 1,
                  pt: 2,
                }}
              >
                <Typography variant="h5">Nội dung khóa học</Typography>
                <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ul
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      listStyleType: 'none',
                      padding: 0,
                      margin: 0,
                      alignItems: 'center',
                    }}
                  >
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Typography variant="subtitle1">{course?.dm_khoahoc?.Sotiethoc}</Typography>
                      <Typography>Tiết học</Typography>
                      <span style={{ marginLeft: '0.5rem' }}>•</span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        position: 'relative',
                      }}
                    >
                      <Typography variant="subtitle1">{course?.dt_lichhocs.length}</Typography>
                      <Typography>Bài học</Typography>
                      <span style={{ marginLeft: '0.5rem' }}>•</span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Typography>Thời lượng</Typography>
                      <Typography variant="subtitle1">
                        {convertToTime(Number(course?.dm_khoahoc?.Tongthoigian))}
                      </Typography>
                    </li>
                  </ul>
                  <Typography
                    sx={{
                      cursor: 'pointer', // Hiển thị con trỏ như một liên kết
                      color: 'primary.main', // Màu sắc giống như một liên kết
                      textDecoration: 'underline', // Gạch chân để trông giống như một liên kết
                      '&:hover': {
                        color: 'primary.dark', // Đổi màu khi hover
                      },
                    }}
                    variant="button"
                    onClick={expandAll}
                  >
                    {expandedAccordions.length > 0 ? 'Thu nhỏ' : ' Mở rộng'}
                  </Typography>
                </Stack>
              </Stack>

              <Box marginTop={2}>
                <CourseDetailsReview
                  course={logs}
                />
              </Box>
            </Grid>

          </Grid>
        )}

        {isLoading && <SkeletonProductDetails />}
      </Container>
    </>
  );
}
