import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getKhoaHocs } from '../redux/slices/course';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// @types
import { IProduct, IProductFilter } from '../@types/product';
// components
import FormProvider from '../components/hook-form';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
// sections
import {
  CourseFilterDrawer,
  CourseSort,
  CourseList,
  CourseCard,
  CourseTagFiltered,
  CourseSearch
} from '../sections/courses/list';


import CartWidget from '../sections/@dashboard/e-commerce/CartWidget';
import { ICourseFilter, ICourseTableFilterValue, IDM_Khoahoc } from 'src/@types/course';

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

export default function CoursePage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { dm_khoahoc } = useSelector((state) => state.course);

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

  const values = watch();

  const dataFiltered = applyFilter(dm_khoahoc, filters);

  useEffect(() => {
    dispatch(getKhoaHocs());
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
        <title> PMC Knowledge - Khóa học</title>
      </Helmet>

      <FormProvider methods={methods}>
        <Container maxWidth={themeStretch ? false : 'lg'} sx={{ marginY: 10 }}>
          {/* <CustomBreadcrumbs
            heading="Shop"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'E-Commerce',
                href: PATH_DASHBOARD.eCommerce.root,
              },
              { name: 'Shop' },
            ]}
          /> */}

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

            {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <CourseFilterDrawer
                isDefault={isDefault}
                open={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetFilter={handleResetFilter}
              />

              <CourseSort />
            </Stack> */}
          </Stack>

          {/* <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{dataFiltered.length}</strong>
                  &nbsp;Products found
                </Typography>

                <CourseTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack> */}

          <CourseList products={dataFiltered} loading={!dm_khoahoc.length && isDefault} />

          {/* <CartWidget totalItems={checkout.totalItems} /> */}
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(courses: IDM_Khoahoc[], filters: ICourseFilter) {
  const { gender, category, colors, priceRange, rating, sortBy, name } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  console.log('name', name)

  // NAME 

  if (name) {
    courses = courses?.filter(
      (item) =>
        `${item.Tenkhoahoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        `${item.Sotiethoc}`.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        `${item.Tongthoigian}`.toLowerCase().indexOf(name.toLowerCase()) !== -1

    );
  }

  // SORT BY
  if (sortBy === 'featured') {
    courses = orderBy(courses, ['sold'], ['desc']);
  }

  if (sortBy === 'newest') {
    courses = orderBy(courses, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    courses = orderBy(courses, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    courses = orderBy(courses, ['price'], ['asc']);
  }

  // FILTER courses
  // if (gender.length) {
  //   courses = courses.filter((product) => gender.includes(product.gender));
  // }

  // if (category !== 'All') {
  //   products = products.filter((product) => product.category === category);
  // }

  // if (colors.length) {
  //   products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
  // }

  // if (min !== 0 || max !== 200) {
  //   products = products.filter((product) => product.price >= min && product.price <= max);
  // }

  // if (rating) {
  //   products = products.filter((product) => {
  //     const convertRating = (value: string) => {
  //       if (value === 'up4Star') return 4;
  //       if (value === 'up3Star') return 3;
  //       if (value === 'up2Star') return 2;
  //       return 1;
  //     };
  //     return product.totalRating > convertRating(rating);
  //   });
  // }

  return courses;
}
