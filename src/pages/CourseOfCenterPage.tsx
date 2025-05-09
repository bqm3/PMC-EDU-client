import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback, useMemo } from 'react';
import _debounce from 'lodash/debounce';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Stack, Box, Pagination } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getClassCourse, getUsersCourse, getUsersAwaitCourse } from '../redux/slices/course';
// components
import { useSettingsContext } from '../components/settings';
// sections
import {
  CourseList,
  CourseSearch
} from '../sections/classes/list';

import { ICourseFilter, ICourseTableFilterValue, ILophoc } from 'src/@types/course';

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

const ITEMS_PER_PAGE = 6;

export default function CourseByUser() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { class_courses, user_courses, await_courses } = useSelector((state) => state.course);

  const [filters, setFilters] = useState(defaultValues);
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<ICourseFilter>({
    defaultValues,
  });

  const {
    formState: { dirtyFields },
  } = methods;

  const isDefault = !dirtyFields.name || false;

  const dataFiltered = applyFilter(class_courses, filters);

  useEffect(() => {
    dispatch(getClassCourse());
    dispatch(getUsersCourse());
    dispatch(getUsersAwaitCourse());
  }, [dispatch]);

  // Tính tổng số trang
  const totalPages = Math.ceil(dataFiltered.length / ITEMS_PER_PAGE);

  // Cắt dữ liệu theo trang hiện tại
  const dataPaginated = dataFiltered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Hàm thay đổi trang
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const debouncedHandleFilters = useMemo(() =>
    _debounce((name: string, value: ICourseTableFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setCurrentPage(1); // reset page về 1 khi lọc
    }, 100) // 300ms debounce
    , []);


  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Lớp học</title>
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
              onFilters={debouncedHandleFilters}
            //
            />

          </Stack>

          <CourseList classes={dataPaginated} loading={!class_courses.length && isDefault} user_courses={user_courses} await_courses={await_courses} />
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

function applyFilter(courses: ILophoc[], filters: ICourseFilter) {
  const { name } = filters;

  if (name) {
    courses = courses?.filter(
      (item) =>
        `${item.Tenlop}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        `${item.dm_khoahoc?.Tenkhoahoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        `${item.Malop}`.toLowerCase().indexOf(name.toLowerCase()) !== -1

    );
  }
  return courses;
}
