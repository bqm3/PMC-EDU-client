import { useState } from 'react';
import axios from '../../../utils/axios';
import { useTheme } from '@mui/material/styles';
import { Card, Stack, Typography, Button, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import Label from '../../../components/label';
import { IDangKy, IHocvien, ILophoc } from 'src/@types/course';

type Props = {
  data: ILophoc;
  user_courses: IHocvien[];
  await_courses: IDangKy[];
};

export default function ClassCourseCard({ data, user_courses, await_courses }: Props) {
  const {
    iShow,
    ID_Loainhom,
    ID_Lophoc,
    ID_Khoahoc,
    Malop,
    Soluongdangky,
    Tenlop,
    ID_Hinhthucdt,
    iTinhtrang,
    Ngaybd,
    Ngaykt,
    dm_khoahoc,
    dm_loainhom,
    dm_phongban
  } = data;

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempTinhtrang, setTempTinhtrang] = useState(iTinhtrang);

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString || typeof dateString !== "string") return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return "";

    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  // Kiểm tra trạng thái đăng ký
  const isRegistered = user_courses?.some(course => course.ID_Lophoc === ID_Lophoc);
  const rejectedCourse = await_courses?.find((course: IDangKy) => course.ID_Lophoc === ID_Lophoc && `${course.iTinhtrang}` === '0');
  const awaitingApproval = await_courses?.some((course: IDangKy) => course.ID_Lophoc === ID_Lophoc && `${course.iTinhtrang}` === '1') || tempTinhtrang === "1";

  const handleRegisterCourse = async () => {
    setIsSubmitting(true);
    await axios.post('/api/v1/dangky/create', {
      ID_Loainhom,
      iShow,
      ID_Lophoc,
      ID_Khoahoc,
      Malop,
      Tenlop,
      ID_Loaidangky: 2,
      Ngaydangky: new Date(),
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    })
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: 'success', autoHideDuration: 4000 });
        setTempTinhtrang("1"); // Cập nhật trạng thái tạm thời thành 1 (Đang đợi xét duyệt)
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 4000 });
      })
      .finally(() => {
        setIsSubmitting(false); // Tắt loading sau khi hoàn tất
      });
  };

  const handleCopyMalop = () => {
    navigator.clipboard.writeText(Malop)
      .then(() => {
        enqueueSnackbar("Mã lớp học đã được sao chép!", { variant: 'success', autoHideDuration: 3000 });
      })
      .catch(() => {
        enqueueSnackbar("Lỗi khi sao chép!", { variant: 'error', autoHideDuration: 3000 });
      });
  };

  return (
    <>
      <Card
        sx={{
          '&:hover .add-cart-btn': { opacity: 1 },
          borderRadius: '8px',
          boxShadow: theme.customShadows.dropdown,
        }}
      >
        <Stack spacing={1}>
          <Typography color="inherit" variant="subtitle1" noWrap sx={{ px: 2, pt: 1 }}>
            {Tenlop}
          </Typography>

          <Stack
            sx={{
              borderTop: "1px solid #bcbcbc",
              borderBottom: "1px solid #bcbcbc",
              px: 2,
              py: 1,
              bgcolor: "background.paper",
            }}
            spacing={1}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.primary" variant="body2">Hình thức đào tạo:</Typography>
              <Label
                variant="soft"
                color={Number(ID_Hinhthucdt) === 1 ? 'error' : Number(ID_Hinhthucdt) === 2 ? 'info' : 'secondary'}
                sx={{ fontWeight: "bold", borderRadius: "8px", px: 2, py: 0.5 }}
              >
                {Number(ID_Hinhthucdt) === 1 && ' Online'}
                {Number(ID_Hinhthucdt) === 2 && ' E.Learning'}
              </Label>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.primary" variant="body2">Nhóm đào tạo</Typography>

              <Typography variant="subtitle2" fontWeight="bold"> {dm_loainhom?.Loainhom}</Typography>
            </Stack>
            {
              dm_phongban?.Tenpb && (
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography color="text.primary" variant="body2">Phòng ban</Typography>

                  <Typography variant="subtitle2" fontWeight="bold"> {dm_phongban?.Tenpb}</Typography>
                </Stack>
              )
            }

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.primary" variant="body2">Mã lớp học</Typography>

              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle2" fontWeight="bold">{Malop}</Typography>
                <IconButton size="small" onClick={handleCopyMalop} sx={{ ml: 0.5 }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.primary" variant="body2">Khóa học</Typography>

              <Typography variant="subtitle2" fontWeight="bold"> {dm_khoahoc?.Tenkhoahoc}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.primary" variant="body2">Số lượng tham gia</Typography>

              <Typography variant="subtitle2" fontWeight="bold"> {Number(Soluongdangky)}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.primary" variant="body2">Thời gian học</Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                {formatDate(`${Ngaybd}`)} - {formatDate(`${Ngaykt}`)}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1, px: 2, pb: 2, width: "100%" }}>
            {rejectedCourse ? (
              <>
                <Typography variant="body2" color="error" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                  Lý do từ chối: {rejectedCourse?.Lydo}
                </Typography>
                <Button variant="contained" color="error" disabled>
                  Không được duyệt
                </Button>
              </>
            ) : awaitingApproval ? (
              <>
                <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1 }}>
                  Đang đợi xét duyệt...
                </Typography>
                <Button variant="contained" color="warning" disabled>
                  Đang đợi xét duyệt
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1 }}>
                  {/* Nếu cần hiển thị thông tin thêm, bạn có thể để text ở đây */}
                </Typography>
                <Button
                  type="submit"
                  onClick={handleRegisterCourse}
                  variant="outlined"
                  disabled={isRegistered || Number(iTinhtrang) === 2 || isSubmitting}
                  sx={{
                    width: "auto",
                    minWidth: "unset",
                    px: 2,
                    py: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  {isSubmitting ? <CircularProgress size={20} color="inherit" /> : (
                    isRegistered
                      ? 'Đã đăng ký'
                      : Number(iTinhtrang) === 2
                        ? 'Hết hạn đăng ký'
                        : 'Đăng ký'
                  )}
                </Button>
              </>
            )}
          </Stack>

        </Stack>
      </Card>
    </>
  );
}
