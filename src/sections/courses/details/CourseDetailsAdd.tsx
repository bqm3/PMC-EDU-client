import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../auth/useAuthContext';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { Box, Link, Stack, Button, Rating, Divider, Typography, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// api 
import { IKhoahoc } from 'src/@types/course';
// routes
import { PATH_AUTH, PATH_DASHBOARD, PATH_EXERCISE, PATH_LESSON } from '../../../routes/paths';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import FormProvider, { RHFSelect } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------
type Props = {
  course: IKhoahoc;
  checkCourse: any
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

export default function CourseDetailsAdd({ course, checkCourse, ...other }: Props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [disableCheck, setDisableCheck] = useState(false)
  const [open, setOpen] = useState(false);
  const [openBaiThi, setOpenBaiThi] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorSubmit(false)
  };

  const handleCloseBaiThi = () => {
    setOpenBaiThi(false);
  };

  const {
    ID_Khoahoc,
    SlugTenkhoahoc,
    Tenkhoahoc,
    Gioithieuchung,
    Sotiethoc,
    Tongthoigian,
    Hinhanh,
    isDelete,
    dm_linhvuc,
  } = course;

  const methods = useForm<any>({
    // defaultValues,
  });

  const { handleSubmit } = methods;


  const onSubmit = async (data: any, event: any) => {
    const clickedButton = event.nativeEvent.submitter; // Lấy thông tin nút được nhấn
    const action = clickedButton?.name; // Lấy thuộc tính name hoặc value của nút
    try {
      if (action === 'register') {
        // Xử lý cho nút 'Đăng ký học'
        if (user) {
          if (checkCourse?.check === "ERROR") {
            setDisableCheck(true)
            await axios.post('/api/v1/dangky/create/', {
              ID_Loaidangky: 1,
              Ngaydangky: new Date(),
              ID_Lophoc: null,
              ID_Khoahoc: ID_Khoahoc,
              Email: user?.Email
            }, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            })
              .then((response) => {
                setDisableCheck(false)
                handleClickOpen()
              })
              .catch((error) => {
                setDisableCheck(false)
                setErrorSubmit(true)
                handleClickOpen()
              });
          } else if (checkCourse?.check === "WARN") {
            handleClickOpen()
          } else if (checkCourse?.check === "SUCCESS") {
            handleClickOpen()
          } else {
            navigate(PATH_LESSON.learning.view(`${SlugTenkhoahoc}`), {
              state: {
                Tenkhoahoc
              }
            });
          }
        } else {
          const currentPath = window.location.pathname;
          navigate(PATH_AUTH.login, { state: { from: currentPath } });
        }
      } else if (action === 'registerAdvanced') {
        // Xử lý cho nút 'Đăng ký học nâng cao'


      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpenBaiThi = () => {
    if (checkCourse?.dataKhoaHoc) {
      setOpenBaiThi(true)
    }
  }

  const handleSubmitBaiThi = () => {
    // Xử lý cho nút 'Gửi bài thi'
    setOpenBaiThi(false)
    // Kiểm tra xem đã đăng nhập chưa
    if (user) {
      navigate(PATH_EXERCISE.practice.view(`${SlugTenkhoahoc}`), {
        state: {
          exam: checkCourse?.dataKhoaHoc,
          hocvien: checkCourse?.data
        }
      });
    } else {
      const currentPath = window.location.pathname;
      navigate(PATH_AUTH.login, { state: { from: currentPath } });
    }
  }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ textAlign: 'center' }} spacing={1}>
        <Box
          component="img"
          alt={Hinhanh}
          src={Hinhanh}
          sx={{ borderRadius: 2, maxHeight: 400, objectFit: 'cover' }}
        />
        {/* Đăng ký học */}
        <Button fullWidth size="large" type="submit" name="register" variant="contained" disabled={disableCheck}>
          {!checkCourse && "Đăng ký"}
          {checkCourse?.check === "ERROR" && "Đăng ký học"}
          {checkCourse?.check === "WARN" && "Đợi duyệt"}
          {(checkCourse?.check === "INFO" || checkCourse?.check === "PRIMARY") && "Vào học"}
          {checkCourse?.check === "SUCCESS" && "Hoàn thành"}
        </Button>



        {checkCourse && checkCourse?.check === "INFO" &&
          <Button fullWidth size="large" type="submit" onClick={() => handleClickOpenBaiThi()} color='info' variant="contained">
            Thi trực tuyến
          </Button>
        }

      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"PMC Knowledge"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              checkCourse?.check === "ERROR" && " Hãy kiểm tra Email cá nhân của bạn để xác nhận đăng ký tham gia khóa học."
            }
            {
              checkCourse?.check === "WARN" && " Đợi phòng ban dự án của bạn phê duyệt yêu cầu"
            }
            {
              checkCourse?.check === "SUCCESS" && " Bạn đã hoàn thành khóa học"
            }
            {
              errorSubmit === true && "Có lỗi xảy ra! Xin vui lòng reload lại trang hoặc đợi trong giây lát"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose} autoFocus variant='contained'>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openBaiThi}
        onClose={() => setOpenBaiThi(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" // Tăng độ rộng lên mức trung bình
        fullWidth // Sử dụng toàn bộ chiều rộng có thể
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 12, // Bo góc hộp thoại
            padding: 2, // Thêm padding
          },
        }}
      >
        {/* Tiêu đề Dialog */}
        {/* <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          PMC Knowledge
        </DialogTitle> */}

        {/* Nội dung Dialog */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
              {checkCourse?.dataKhoaHoc?.Tenbaikt}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", fontSize: "18px" }}>
              ⏳ Thời gian thi: {checkCourse?.dataKhoaHoc?.Thoigianthi} phút
            </Typography>
          </DialogContentText>
        </DialogContent>

        {/* Nút hành động */}
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
          <Button onClick={handleCloseBaiThi} variant="outlined" sx={{ fontWeight: "bold", color: "#d32f2f", borderColor: "#d32f2f" }}>
            Hủy
          </Button>
          <Button onClick={handleSubmitBaiThi} autoFocus variant="contained" sx={{ fontWeight: "bold", backgroundColor: "#388e3c", color: "#fff" }}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

    </FormProvider>
  );
}
