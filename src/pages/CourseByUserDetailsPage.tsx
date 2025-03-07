import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
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
import { IKhoahoc } from 'src/@types/course';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function CourseByUserDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const dispatch = useDispatch();

  const { course, isLoading } = useSelector((state) => state.course);

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

  useEffect(() => {
    setLogs(course?.dt_lichhocs);
  }, [course]);

  return (
    <>
      <Helmet>
        <title>{`${course?.Tenlop || ''}`}</title>
      </Helmet>
      {isLoading ? (
        <SkeletonProductDetails />
      ) : (
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container maxWidth={themeStretch ? false : 'lg'}>
            {course && (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={8}
                  sx={{
                    p: (theme) => ({
                      md: theme.spacing(2, 5, 0, 2),
                    }),
                  }}
                >
                  <CourseDetailsSummary course={course} />
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <Stack
                    sx={{
                      gap: 1,
                      pb: 2,
                    }}
                  >
                    <Typography variant="h5">Danh sách lịch học</Typography>
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
                          <Typography variant="subtitle1">{course?.dt_lichhocs?.length}</Typography>
                          <Typography>Tiết học</Typography>
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
                    </Stack>
                  </Stack>
                  <CourseDetailsReview
                    course={logs}
                  // accordionClicked={accordionClicked}
                  // expandedAccordions={expandedAccordions}
                  />
                </Grid>
              </Grid>
            )}
          </Container>
        </Box>
      )}
    </>
  );
}
