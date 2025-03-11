import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  Card,
  CardContent,
  CircularProgress,
  TableHead,
} from '@mui/material';
import { useSettingsContext } from '../components/settings';
import axios from '../utils/axios';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getUsersCourse } from '../redux/slices/course';
import Iconify from 'src/components/iconify';

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { user_courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getUsersCourse());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Lịch sử học tập</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ my: 10 }}>
        <LearningHistory courses={user_courses} />
      </Container>
    </>
  );
}

function LearningHistory({ courses }: any) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectCourse = async (courseID: any) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/hocvien/his-course/${courseID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      setSelectedCourse(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết khóa học:', error);
    }
    setLoading(false);
  };

  // Khi danh sách khóa học thay đổi, nếu chưa có khóa học nào được chọn thì tự động chọn khóa học đầu tiên
  useEffect(() => {
    if (courses && courses.length > 0 && !selectedCourse) {
      handleSelectCourse(courses[0]?.ID_Lophoc);
    }
  }, [courses, selectedCourse]);


  return (
    <Grid container spacing={2}>
      {/* Cột bên trái: danh sách khóa học (3 cột) */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Danh sách khóa học
        </Typography>
        <List component="nav">
          {courses?.map((course: any) => (
            <ListItem
              button
              key={course?.ID_Lophoc}
              selected={
                selectedCourse && selectedCourse?.ID_Lophoc === course?.ID_Lophoc
              }
              onClick={() => handleSelectCourse(course.ID_Lophoc)}
            >
              <ListItemText
                primary={
                  course?.dt_lophoc?.Tenlop || 'Chưa có tên lớp'
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Cột bên phải: chi tiết của khóa học được chọn (9 cột) */}
      <Grid item xs={12} md={9}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              minHeight: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : selectedCourse ? (
          <CourseDetails course={selectedCourse} />
        ) : (
          <Typography variant="body1">
            Chọn một khóa học để xem chi tiết.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

function CourseDetails({ course }: any) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (e: any, newValue: number) => {
    setTabIndex(newValue);
  };
  console.log('course', course)

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Điểm danh" />
        <Tab label="Kết quả kiểm tra" />
        <Tab label="VBCC" />
      </Tabs>
      {tabIndex === 0 && <AttendanceSection attendanceData={course?.diemDanh} />}
      {tabIndex === 1 && <ExamResultsSection examResults={course?.baiThi} />}
      {tabIndex === 2 && <VBCCSection vbccData={course?.vbcc} />}
    </Box>
  );
}
function AttendanceSection({ attendanceData }: any) {

  // Merge 2 mảng và thêm trạng thái điểm danh
  const mergedAttendance = [
    ...(attendanceData?.watchedDiemdanh?.map((item: any) => ({
      ...item,
      status: <Iconify icon="mdi:check-circle" width={24} height={24} color="success.main" /> // Đã điểm danh
    })) || []),
    ...(attendanceData?.missingDiemdanh?.map((item: any) => ({
      ...item,
      status: <Iconify icon="mdi:close-circle" width={24} height={24} color="error.main" /> // Chưa điểm danh
    })) || [])
  ];

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Giờ bắt đầu</TableCell>
            <TableCell>Giờ kết thúc</TableCell>
            <TableCell>Nội dung</TableCell>
            <TableCell>Địa điểm</TableCell>
            <TableCell>Điểm danh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mergedAttendance.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{item?.Ngay}</TableCell>
              <TableCell>{item?.Giobatdau}</TableCell>
              <TableCell>{item?.Gioketthuc}</TableCell>
              <TableCell dangerouslySetInnerHTML={{ __html: item?.Noidung }} />
              <TableCell>{item?.Noihoc}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}



function ExamResultsSection({ examResults }: any) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Typography variant="subtitle1">Kết quả kiểm tra:</Typography>
      <Typography variant="body1">
        Kết quả: {examResults?.Tongdiem} đ
      </Typography>
      <Typography variant="body2">
        Thời gian thi: {examResults?.Thoigianbd}
      </Typography>
      <Typography variant="body2">
        Thời gian nộp: {examResults?.Thoigiannb}
      </Typography>
      <Button
        variant="outlined"
        onClick={() => setOpenModal(true)}
        sx={{ mt: 2 }}
      >
        Xem chi tiết bài làm
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Card>
          <CardContent>
            <Typography variant="h6">Chi tiết bài làm</Typography>
            <Typography variant="body2">{examResults?.detail}</Typography>
            <Button onClick={() => setOpenModal(false)}>Đóng</Button>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}

function VBCCSection({ vbccData }: any) {
  return (
    <Box>
      <Typography variant="subtitle1">VBCC:</Typography>
      {vbccData?.map((item: any, index: number) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="body2">{item?.title}</Typography>
          <Button variant="text">Xem chi tiết</Button>
        </Box>
      ))}
    </Box>
  );
}
