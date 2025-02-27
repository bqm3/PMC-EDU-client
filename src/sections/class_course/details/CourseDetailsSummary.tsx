import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { Box, Link, Stack, Button, Rating, Divider, Typography, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// @types
import { IProduct, ICheckoutCartItem } from '../../../@types/product';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import { IncrementerButton } from '../../../components/custom-input';
import { ColorSinglePicker } from '../../../components/color-utils';
import FormProvider, { RHFSelect } from '../../../components/hook-form';
import { IKhoahoc } from 'src/@types/course';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<ICheckoutCartItem, 'colors'> {
  colors: string;
}

type Props = {
  course: IKhoahoc;
};

export default function CourseDetailsSummary({
  course,
  ...other
}: Props) {
  const navigate = useNavigate();

  const {
    ID_Khoahoc,

    SlugTenkhoahoc,
    Tenkhoahoc,
    Gioithieuchung,
    Sotiethoc,
    Tongthoigian,
    Hinhanh,
    isDelete,
    dm_linhvuc
  } = course;

  return (
    <Stack
      spacing={3}

      {...other}
    >
      <Stack spacing={2}>
        <Label
          variant="soft"
          color={dm_linhvuc?.Linhvuc === 'in_stock' ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase', mr: 'auto' }}
        >
          {dm_linhvuc?.Linhvuc}
        </Label>
        <Typography variant="h3">{Tenkhoahoc}</Typography>
        <div dangerouslySetInnerHTML={{ __html: Gioithieuchung }} />
      </Stack>

    </Stack>
  );
}
