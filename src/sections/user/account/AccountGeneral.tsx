import * as Yup from 'yup';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DatePicker } from '@mui/x-date-pickers';
// @mui
import { Box, Grid, Card, Stack, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// utils
import { fData } from '../../../utils/formatNumber';
// assets
import { countries } from '../../../assets/data';
// components
import { CustomFile } from '../../../components/upload';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import axios from 'axios';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Nam', value: '1' },
  { label: 'Nữ', value: '0' },
];

type FormValuesProps = {
  Hodem: string;
  Ten: string;
  iGioitinh: string;
  Avatar: CustomFile | string;
  Diachilienhe: string;
  CCCD: string;
  NgaycapCCCD: string;
  Hochieu: string;
  NgaycapHochieu: string;
  DcTamtru: string;
  DcThuongtru: string;
  Email: string;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const accessToken = localStorage.getItem('accessToken');

  const UpdateUserSchema = Yup.object().shape({
    Ten: Yup.string().required('Tên phải bắt buộc'),
  });

  const defaultValues = {
    Hodem: user?.Hodem || '',
    Ten: user?.Ten || '',
    iGioitinh: user?.iGioitinh || '',
    Diachilienhe: user?.Diachilienhe || '',
    CCCD: user?.CCCD || '',
    NgaycapCCCD: user?.NgaycapCCCD || '',
    Hochieu: user?.Hochieu || '',
    NgaycapHochieu: user?.NgaycapHochieu || '',
    DcTamtru: user?.DcTamtru || '',
    DcThuongtru: user?.DcThuongtru || '',
    Email: user?.Email || '',
    Avatar: user?.Avatar || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('Hodem', data?.Hodem);
    formData.append('Ten', data?.Ten);
    formData.append('iGioitinh', data?.iGioitinh);
    formData.append('Diachilienhe', data?.Diachilienhe);
    formData.append('CCCD', data?.CCCD);
    formData.append('NgaycapCCCD', data?.NgaycapCCCD);
    formData.append('Hochieu', `${data?.Hochieu}`);
    formData.append('NgaycapHochieu', data?.NgaycapHochieu);
    formData.append('Email', data?.Email);
    formData.append('DcTamtru', data?.DcTamtru);
    formData.append('DcThuongtru', data?.DcThuongtru);
    formData.append('Avatar', data?.Avatar);

    try {
      axios
        .put(`/api/v1/hosohv/update-profile`, formData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // Set correct Content-Type
          },
        })
        .then((res) => {
          enqueueSnackbar('Cập nhật thành công!', { variant: 'success', autoHideDuration: 4000 });

        })
        .catch((error) => {
          if (error.response) {

            enqueueSnackbar(`${error.response.data.message}`, {
              variant: 'error',
              autoHideDuration: 4000,
            });
          } else if (error.request) {
            enqueueSnackbar(
              `Không nhận được phản hồi từ máy chủ`, {
              variant: 'error',
              autoHideDuration: 4000
            });
          } else {
            enqueueSnackbar(`Lỗi gửi yêu cầu`, {
              variant: 'error',
              autoHideDuration: 4000,
            });
          }
        });
    } catch (error) {
      enqueueSnackbar(
        `Lỗi gửi yêu cầu`, {
        variant: 'error',
        autoHideDuration: 4000,
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('Avatar', newFile);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="Avatar"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="Hodem" label="Họ tên đệm" />
              <RHFTextField name="Ten" label="Tên" />
              <RHFTextField name="Email" label="Email" />
              <RHFTextField name="Diachilienhe" label="Địa chỉ liên hệ" />
              <RHFTextField name="CCCD" label="Căn cước công dân" />
              <DatePicker
                label="Ngày cấp căn cước"
                value={new Date(values.NgaycapCCCD)}
                onChange={(newValue: any) => setValue('NgaycapCCCD', newValue)}
                renderInput={(params: any) => <TextField {...params} />}
              />

              {/* <DatePicker
                        label="Start date"
                        value={picker.startDate}
                        onChange={picker.onChangeStartDate}
                        renderInput={(params: any) => <TextField size="small" {...params} />}
                      /> */}
              <RHFTextField name="Hochieu" label="Hộ chiếu" />
              <DatePicker
                label="Ngày cấp hộ chiếu"
                value={new Date(values.NgaycapHochieu)}
                onChange={(newValue: any) => setValue('NgaycapHochieu', newValue)}
                renderInput={(params: any) => <TextField {...params} />}
              />
              {/* <RHFTextField name="NgaycapHochieu" label="Ngày cấp hộ chiều" /> */}
              <RHFTextField name="DcTamtru" label="Địa chỉ tạm trú" />
              <RHFTextField name="DcThuongtru" label="Địa chỉ thường trú" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Giới tính
                </Typography>

                <RHFRadioGroup
                  name="iGioitinh"
                  options={GENDER_OPTION}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Stack>
              {/* <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />

              <RHFTextField name="city" label="City" />

              <RHFTextField name="zipCode" label="Zip/Code" /> */}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Lưu thay đổi
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
