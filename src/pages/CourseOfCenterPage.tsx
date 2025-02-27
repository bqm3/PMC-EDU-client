import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getClassCourse, getUsersCourse, getUsersAwaitCourse } from '../redux/slices/course';
// components
import FormProvider from '../components/hook-form';
import { useSettingsContext } from '../components/settings';
// sections
import {
  CourseList,
  CourseSearch
} from '../sections/class_course/list';

import { ICourseFilter, ICourseTableFilterValue, IHocvien, IKhoahoc, ILophoc } from 'src/@types/course';

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

export default function CourseByUser() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { class_courses, user_courses, await_courses } = useSelector((state) => state.course);

  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm<ICourseFilter>({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.name &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const dataFiltered = applyFilter(class_courses, filters);

  useEffect(() => {
    dispatch(getClassCourse());
    dispatch(getUsersCourse());
    dispatch(getUsersAwaitCourse());
  }, [dispatch]);

  const handleFilters = useCallback(
    (name: string, value: ICourseTableFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Lớp học</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ marginY: 10 }}>
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

        <CourseList classes={dataFiltered} loading={!class_courses.length && isDefault} user_courses={user_courses} await_courses={await_courses} />

        {/* <CartWidget totalItems={checkout.totalItems} /> */}
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(courses: ILophoc[], filters: ICourseFilter) {
  // const { gender, category, colors, priceRange, rating, sortBy, name } = filters;

  // const min = priceRange[0];

  // const max = priceRange[1];

  // // NAME 

  // if (name) {
  //   courses = courses?.filter(
  //     (item) =>
  //       `${item.Tenkhoahoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
  //       `${item.Sotiethoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
  //       `${item.Tongthoigian}`.toLowerCase().indexOf(name.toLowerCase()) !== -1

  //   );
  // }

  // SORT BY
  // if (sortBy === 'featured') {
  //   courses = orderBy(courses, ['sold'], ['desc']);
  // }

  // if (sortBy === 'newest') {
  //   courses = orderBy(courses, ['createdAt'], ['desc']);
  // }

  // if (sortBy === 'priceDesc') {
  //   courses = orderBy(courses, ['price'], ['desc']);
  // }

  // if (sortBy === 'priceAsc') {
  //   courses = orderBy(courses, ['price'], ['asc']);
  // }

  return courses;
}
