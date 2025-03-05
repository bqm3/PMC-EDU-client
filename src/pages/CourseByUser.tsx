import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Container,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Grid,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getUsersCourse } from '../redux/slices/course';
// components
import FormProvider from '../components/hook-form';
import { useSettingsContext } from '../components/settings';
// sections
import { CourseList, CourseSearch } from '../sections/user_course/list';

import { ICourseFilter, ICourseTableFilterValue, IHocvien, IKhoahoc } from 'src/@types/course';
import { PATH_EXERCISE } from 'src/routes/paths';

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

  const dataFiltered = applyFilter(user_courses, filters);

  useEffect(() => {
    dispatch(getUsersCourse());
  }, [dispatch]);

  const handleFilters = useCallback((name: string, value: ICourseTableFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [examData, setExamData] = useState<any>(null);

  const handleStartExam = () => {
    navigate(PATH_EXERCISE.practice.view(`${examData?.dm_khoahoc?.SlugTenkhoahoc}`), {
      state: {
        exam: examData?.dt_baithi,
        hocvien: examData,
      },
    });
    setOpenDialog(false);
  };

  const handleOpenExamDialog = async (hocvien: IHocvien) => {
    try {
      setExamData(hocvien);
      setOpenDialog(true);
    } catch (error) {
    }
  };

  const now = new Date();

  // Lấy ngày thi và ngày kết thúc từ dữ liệu
  const ngayThi = examData?.dt_baithi?.Ngaythi ? new Date(examData.dt_baithi.Ngaythi) : null;
  const ngayKetThuc = examData?.dt_baithi?.Ngayketthuc ? new Date(examData.dt_baithi.Ngayketthuc) : null;

  // Kiểm tra điều kiện vào thi
  const coTheVaoThi =
    ngayThi &&
    (ngayKetThuc ? ngayThi <= now && ngayKetThuc >= now : ngayThi <= now) &&
    examData?.Hoanthanhhoc !== 0;

  return (
    <>
      <Helmet>
        <title> PMC Knowledge - Lớp học của tôi</title>
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

          <CourseList
            courses={dataFiltered}
            loading={!user_courses.length && isDefault}
            onOpenExamDialog={handleOpenExamDialog}
          />

          {/* <CartWidget totalItems={checkout.totalItems} /> */}
        </Container>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Lịch thi</DialogTitle>
          <DialogContent>
            {examData?.dt_baithi ? (
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  {/* Môn */}
                  <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="bold">
                      Môn:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{examData?.dt_baithi?.Tenbaikt || 'Chưa cập nhật'}</Typography>
                  </Grid>

                  {/* Ngày thi */}
                  <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="bold">
                      Ngày thi:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{examData?.dt_baithi?.Ngaythi || 'Chưa cập nhật'}</Typography>
                  </Grid>

                  {/* Thời gian thi */}
                  <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="bold">
                      Thời gian thi:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{examData?.dt_baithi?.Thoigianthi} phút</Typography>
                  </Grid>

                  {/* Phòng thi */}
                  <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="bold">
                      Hình thức thi:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {examData?.dt_baithi?.dm_hinhthucthi?.Hinhthucthi || 'Chưa cập nhật'}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            ) : (
              <Typography>Không có dữ liệu lịch thi</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Đóng
            </Button>

            <Button
              disabled={!coTheVaoThi}
              onClick={handleStartExam}
              color="success"
              variant="contained"
            >
              {examData?.Hoanthanhhoc === 0 ? "Không được thi" : coTheVaoThi ? "Vào thi" : "Chưa đến giờ"}
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
