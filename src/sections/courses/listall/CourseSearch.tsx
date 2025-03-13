import { useCallback, useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
  StackProps,
  Stack
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { ICourseFilter, ICourseTableFilterValue } from 'src/@types/course';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import { CustomTextField } from '../../../components/custom-input';
import SearchNotFound from '../../../components/search-not-found';

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
        placeholder="Tìm kiếm theo tên khóa học"
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
