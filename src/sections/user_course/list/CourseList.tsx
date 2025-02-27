// @mui
import { Box, BoxProps } from '@mui/material';
// @type
import { IHocvien } from 'src/@types/course';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  courses: IHocvien[];
  loading: boolean;
  onOpenExamDialog: (hocvien: IHocvien) => void;
}

export default function CourseList({ courses, loading, onOpenExamDialog, ...other }: Props) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : courses).map((item, index) =>
        item ? (
          <CourseCard key={item.ID_Khoahoc || index} hocvien={item} onOpenExamDialog={onOpenExamDialog} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
