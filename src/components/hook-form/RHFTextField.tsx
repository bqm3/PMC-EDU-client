// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          sx={{
            // Giảm chiều cao của TextField
            // '& .MuiInputBase-root': {
            //   height: '48px', // Bạn có thể điều chỉnh chiều cao tùy ý
            // },
            // '& .MuiInputBase-input': {
            //   height: '48px',
            //   padding: '10px 14px',
            //   fontSize: '14px', // Điều chỉnh kích thước chữ
            // },

            // '& .MuiFormHelperText-root': {
            //   fontSize: '14px', // Kích thước chữ của helper text
            // },
            // '& .MuiInputLabel-root': {
            //   fontSize: '14px', // Thay đổi kích thước chữ của label
            // },

          }}
          {...other}
        />
      )}
    />
  );
}
