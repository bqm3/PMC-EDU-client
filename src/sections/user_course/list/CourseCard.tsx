import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Typography, Button } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
import Image from '../../../components/image';
import Label, { LabelColor } from '../../../components/label';
import { IHocvien } from 'src/@types/course';
import moment from 'moment';

type Props = {
  hocvien: IHocvien;
  onOpenExamDialog: (hocvien: IHocvien) => void; // 🟢 Nhận hàm gọi API từ props
};

export default function UserCourseCard({ hocvien, onOpenExamDialog }: Props) {
  const { dm_khoahoc, dt_lophoc, dt_baithi } = hocvien;

  const linkTo = PATH_PAGE.courstByMe.view(`${dt_lophoc?.Malop}`);

  function tinhTrangLopHoc(i: number) {
    const getStatus = (status: number) => {
      switch (status) {
        case 0:
          return { text: 'Bắt đầu mở lớp', color: 'info' as LabelColor };
        case 1:
          return { text: 'Đang đào tạo', color: 'success' as LabelColor };
        case 2:
          return { text: 'Đào tạo xong', color: 'warning' as LabelColor };
        case 3:
          return { text: 'Đóng lớp', color: 'error' as LabelColor };
        default:
          return { text: 'Không xác định', color: 'default' as LabelColor };
      }
    };

    const { text, color } = getStatus(Number(dt_lophoc?.iTinhtrang));

    return (
      <Label variant="soft" color={color}>
        <Typography sx={{ fontSize: 12 }}>{text}</Typography>
      </Label>
    );
  }

  // Xác định trạng thái và text của button
  const getButtonLabel = (status: number, iExam: any) => {
    if (status === 0 || status === 1) return { text: 'Vào học', disabled: false, action: 'study' };
    if (status === 2 && !iExam) return { text: 'Vào thi', disabled: false, action: 'exam' };

    if (status === 2 && iExam) {
      const { Thoigianbd, Thoigiannb } = iExam;
      console.log('Thoigianbd, Thoigiannb', Thoigianbd, Thoigiannb)
      console.log('dt_baithi', dt_baithi)
      const thoigianthi = dt_baithi?.Thoigianthi || 0;
      console.log('thoigianthi', thoigianthi)

      if (Thoigianbd && !Thoigiannb) {
        const examStart = moment(Thoigianbd, "YYYY-MM-DD HH:mm:ss");
        const examEnd = examStart.clone().add(thoigianthi, "minutes");
        const now = moment();
        console.log('now', examEnd)

        if (examStart.isValid() && examEnd.isValid()) {
          if (now.isBefore(examEnd)) {
            console.log('tiep tuc')
            return { text: 'Tiếp tục thi', disabled: false, action: 'continue' };
          } else {
            console.log('het gio')
            return { text: 'Đã hết thời gian thi', disabled: true, action: 'timeout' };
          }
        } else {
          console.warn("❌ Không thể phân tích thời gian thi. Thoigianbd có thể sai định dạng.");
          return { text: 'Lỗi thời gian', disabled: true, action: 'error' };
        }
      }

      if (Thoigianbd && Thoigiannb) {
        return { text: 'Đã thi xong', disabled: true, action: 'closed' };
      }

      if ((!Thoigianbd && !Thoigiannb) || (!Thoigianbd && Thoigiannb)) {
        return { text: 'Vào thi', disabled: false, action: 'exam' };
      }
    }

    if (status === 3) return { text: 'Đóng lớp', disabled: true, action: 'closed' };

    return { text: 'Không xác định', disabled: true, action: 'unknown' };
  };

  const buttonState = getButtonLabel(Number(dt_lophoc?.iTinhtrang), dt_baithi?.baithihocvien_list[0]);

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', px: 1.5, py: 1 }}>
        <Image
          alt={dm_khoahoc?.Hinhanh}
          src={dm_khoahoc?.Hinhanh}
          ratio="16/9"
          sx={{ borderRadius: 1.5 }}
        />
      </Box>

      <Stack spacing={1} sx={{ px: 2, pb: 1 }}>
        <Link to={linkTo} component={RouterLink} color="inherit" variant="subtitle1" noWrap>
          {dt_lophoc?.Tenlop}
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="text.primary" variant="body2">
            Hình thức đào tạo:
          </Typography>
          <Label
            variant="soft"
            color={Number(dt_lophoc?.ID_Hinhthucdt) === 1 ? 'error' : Number(dt_lophoc?.ID_Hinhthucdt) === 2 ? 'info' : 'secondary'}
            sx={{ fontWeight: "bold", borderRadius: "8px", px: 2, py: 0.5 }}
          >
            {Number(dt_lophoc?.ID_Hinhthucdt) === 1 && ' Online'}
            {Number(dt_lophoc?.ID_Hinhthucdt) === 2 && ' E.Learning'}
          </Label>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="text.primary" variant="body2">
            Khóa học:
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold">
            {dm_khoahoc?.Tenkhoahoc}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="text.primary" variant="body2">
            Mã lớp:
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold">
            ({dt_lophoc?.Malop})
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="text.primary" variant="body2">
            Tình trạng:{' '}
          </Typography>
          {tinhTrangLopHoc(Number(dt_lophoc?.iTinhtrang))}
        </Stack>

        {/* Xử lý button */}
        {!buttonState.disabled ? (
          buttonState.action === 'study' ? (
            <Button
              variant="contained"
              color="info"
              fullWidth
              component={RouterLink}
              to={linkTo}
              sx={{ mt: 1 }}
            >
              {buttonState.text}
            </Button>
          ) : buttonState.action === 'exam' || buttonState.action === 'continue' ? ( // ✅ thêm 'continue'
            <Button
              variant="contained"
              color={buttonState.action === 'continue' ? 'warning' : 'success'} // ✅ màu khác biệt nếu muốn
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => onOpenExamDialog(hocvien)}
            >
              {buttonState.text}
            </Button>
          ) : null
        ) : (
          <Button variant="contained" color="secondary" fullWidth disabled sx={{ mt: 1 }}>
            {buttonState.text}
          </Button>
        )}

      </Stack>
    </Card>
  );
}
