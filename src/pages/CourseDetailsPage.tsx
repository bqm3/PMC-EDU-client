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

import { getDetailKhoaHoc, getUsersCourse, getUsersAwaitCourse } from 'src/redux/slices/course';
import CourseList from 'src/sections/courses/class/CourseList';

// ----------------------------------------------------------------------

export default function CourseDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const dispatch = useDispatch();

  const { detai_class_courses, isLoading, user_courses, await_courses } = useSelector((state) => state.course);

  useEffect(() => {
    if (name) {
      dispatch(getDetailKhoaHoc(name as string));

      dispatch(getUsersCourse());
      dispatch(getUsersAwaitCourse());
    }
  }, [dispatch, name]);


  return (
    <>
      <Helmet>
        <title>{`PMC Knowledge - ${detai_class_courses?.Tenkhoahoc || ''}`}</title>
      </Helmet>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth={themeStretch ? false : 'lg'} sx={{ my: 10 }}>
          <CourseList
            classes={detai_class_courses?.dt_lophocs || []}
            user_courses={user_courses}
            await_courses={await_courses}
            loading={!detai_class_courses?.dt_lophocs.length}
          />
          {isLoading && <SkeletonProductDetails />}
        </Container>
      </Box>
    </>
  );
}
