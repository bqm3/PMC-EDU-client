import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getUsersCourse } from '../redux/slices/course';
// components
import FormProvider from '../components/hook-form';
import { useSettingsContext } from '../components/settings';
// sections
import {
  CourseList,
  CourseSearch
} from '../sections/user_course/list';

import { ICourseFilter, ICourseTableFilterValue, IHocvien, IKhoahoc } from 'src/@types/course';

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

  const { user_courses } = useSelector((state) => state.course);

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

  const dataFiltered = applyFilter(user_courses, filters);

  useEffect(() => {
    dispatch(getUsersCourse());
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

  const [openDialog, setOpenDialog] = useState(false)
  const [examData, setExamData] = useState<any>(null)

  const handleOpenExamDialog = async (hocvien: IHocvien) => {
    try {
      // const response = await axios.get(`/exam-schedule/${hocvien.ID_Hinhthucthi}`);

      setExamData(hocvien.dt_baithi); // Lưu lịch thi vào state
      setOpenDialog(true); // Mở dialog hiển thị lịch thi
    } catch (error) {
      // enqueueSnackbar('Không thể lấy lịch thi!', { variant: 'error' });
    }
  };
  const now = new Date();

  // Lấy ngày thi và ngày kết thúc từ dữ liệu
  const ngayThi = examData?.Ngaythi ? new Date(examData.Ngaythi) : null;
  const ngayKetThuc = examData?.Ngayketthuc ? new Date(examData.Ngayketthuc) : null;

  // Kiểm tra điều kiện vào thi
  const coTheVaoThi = ngayThi && ((ngayKetThuc ? (ngayThi <= now && ngayKetThuc >= now) : ngayThi <= now));

  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Khóa học</title>
      </Helmet>

      <FormProvider methods={methods}>
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

          <CourseList courses={dataFiltered} loading={!user_courses.length && isDefault} onOpenExamDialog={handleOpenExamDialog} />

          {/* <CartWidget totalItems={checkout.totalItems} /> */}
        </Container>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Lịch thi</DialogTitle>
          <DialogContent>
            {examData ? (
              <Stack spacing={2}>
                <Typography variant="body1">Môn: {examData?.Tenbaikt}</Typography>
                <Typography variant="body1">Ngày thi: {examData?.Ngaythi}</Typography>
                <Typography variant="body1">Thời gian: {examData?.Thoigianthi} (phút)</Typography>
                <Typography variant="body1">Phòng thi: {examData?.dm_hinhthucthi?.Hinhthucthi}</Typography>
              </Stack>
            ) : (
              <Typography>Không có dữ liệu lịch thi</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Đóng
            </Button>


            <Button disabled={!coTheVaoThi || false} onClick={() => setOpenDialog(false)} color="success" variant='contained'>
              {coTheVaoThi ? 'Vào thi' : 'Chưa đến giờ'}
            </Button>

          </DialogActions>
        </Dialog>

      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(courses: IHocvien[], filters: ICourseFilter) {
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
