import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';
import { useState } from 'react';

// ----------------------------------------------------------------------
type IForm = {
  hoten: string;
  email: string;
  noidung: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<IForm>({
    hoten: '',
    email: '',
    noidung: ''
  });

  const handleSubmit = () => {
    console.log('Dữ liệu gửi đi:', formData);
  };

  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Đăng ký nhận thông tin về khóa học mới nhất
        </Typography>
      </m.div>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField
            name="hoten"
            value={formData.hoten}
            onChange={(e) => setFormData({ ...formData, hoten: e.target.value })}
            fullWidth
            label="Họ tên"
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            label="Email"
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField
            name="noidung"
            value={formData.noidung}
            onChange={(e) => setFormData({ ...formData, noidung: e.target.value })}
            fullWidth
            label="Nhập nội dung"
            multiline
            rows={4}
          />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained" onClick={handleSubmit}>
          Gửi
        </Button>
      </m.div>
    </Stack>
  );
}
