import { useCallback, useState } from 'react';
// @mui
import {
  TextField,
  InputAdornment,
  StackProps,
  Stack
} from '@mui/material';
// @types
import { ICourseFilter, ICourseTableFilterValue } from 'src/@types/course';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
type Props = StackProps & {
  filters: ICourseFilter;

  onFilters: (name: string, value: ICourseTableFilterValue) => void;
};

export default function CourseSearch({ filters, onFilters }: Props) {

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  return (
    <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
      <TextField
        value={filters.name}
        onChange={handleFilterName}
        placeholder="Tìm kiếm....."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: 300,
          '&.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 1)',
          },
        }}
      />


    </Stack>
  );
}
