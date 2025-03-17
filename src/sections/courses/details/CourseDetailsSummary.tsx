
// @mui
import { Box, Link, Stack, Button, Rating, Divider, Typography, IconButton } from '@mui/material';
// components
import Label from '../../../components/label';
import { ILophoc } from 'src/@types/course';

// ----------------------------------------------------------------------

type Props = {
  course: ILophoc;
};

export default function CourseDetailsSummary({
  course,
  ...other
}: Props) {

  const {
    dm_khoahoc,
    dm_hinhthucdt,
    Tenlop
  } = course;

  return (
    <Stack
      spacing={3}

      {...other}
    >
      <Stack spacing={2}>
        <Label
          variant="soft"
          color={dm_khoahoc?.dm_linhvuc?.Linhvuc === "in_stock" ? "success" : "error"}
          sx={{
            textTransform: "uppercase",
            alignSelf: "flex-start",
            maxWidth: "fit-content",
            px: 2,
          }}
        >
          {dm_khoahoc?.dm_linhvuc?.Linhvuc}
        </Label>

        <Label
          variant="filled"
          color="info"
          sx={{
            textTransform: "uppercase",
            alignSelf: "flex-start",
            maxWidth: "fit-content",
            px: 2,
          }}
        >
          {dm_hinhthucdt?.Hinhthucdt}
        </Label>

        {/* Tiêu đề lớp học */}
        <Typography variant="h4">{Tenlop}</Typography>
        <Typography variant="h6">{dm_khoahoc?.Tenkhoahoc}</Typography>

        {/* Nội dung giới thiệu */}
        <div dangerouslySetInnerHTML={{ __html: dm_khoahoc?.Gioithieuchung }} />
      </Stack>


    </Stack>
  );
}
