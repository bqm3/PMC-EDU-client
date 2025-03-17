import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Box, Pagination } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getKhoaHocs } from '../redux/slices/course';
// components
import FormProvider from '../components/hook-form';
import { useSettingsContext } from '../components/settings';
// sections
import {
  CourseFilterDrawer,
  CourseSort,
  CourseList,
  CourseCard,
  CourseTagFiltered,
  CourseSearch
} from '../sections/courses/listall';

import { ICourseFilter, ICourseTableFilterValue, IKhoahoc } from 'src/@types/course';

// ----------------------------------------------------------------------
const defaultValues = {
  name: '',
  gender: [],
  category: 'All',
  colors: [],
  priceRange: [0, 200],
  rating: '',
  sortBy: 'featured',
};
const ITEMS_PER_PAGE = 12;

export default function CoursePage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { dm_khoahoc } = useSelector((state) => state.course);

  const [filters, setFilters] = useState(defaultValues);

  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<ICourseFilter>({
    defaultValues,
  });

  const {
    reset,
    formState: { dirtyFields },
  } = methods;

  const isDefault = !dirtyFields.name && false;

  const dataFiltered = applyFilter(dm_khoahoc, filters);

  useEffect(() => {
    dispatch(getKhoaHocs());
  }, [dispatch]);

  const totalPages = Math.ceil(dataFiltered.length / ITEMS_PER_PAGE);

  const dataPaginated = dataFiltered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleFilters = useCallback(
    (name: string, value: ICourseTableFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Khóa học</title>
      </Helmet>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >

        <Container maxWidth={themeStretch ? false : 'lg'} sx={{
          // justifyItems: 'center',
          // alignItems: 'center',
          my: { xs: 5, md: 10 },
        }}>

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <CourseSearch
              filters={filters}
              onFilters={handleFilters}
            //
            />

          </Stack>

          <CourseList courses={dataPaginated} loading={!dm_khoahoc.length && isDefault} />
          <Stack spacing={2} sx={{
            justifyItems: 'center',
            alignItems: 'center',
            mt: { xs: 2, md: 5 },
          }}>
            <Pagination
              count={totalPages}
              shape="rounded"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(courses: IKhoahoc[], filters: ICourseFilter) {
  const { name } = filters;

  // NAME 

  if (name) {
    courses = courses?.filter(
      (item) =>
        `${item.Tenkhoahoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        `${item.Sotiethoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        `${item.Tongthoigian}`.toLowerCase().indexOf(name.toLowerCase()) !== -1

    );
  }

  return courses;
}
