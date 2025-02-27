// @mui
import { Box, BoxProps } from '@mui/material';
// @type
import { IKhoahoc } from 'src/@types/course';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  courses: IKhoahoc[];
  loading: boolean;
}

export default function CourseList({ courses, loading, ...other }: Props) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : courses).map((product, index) =>
        product ? (
          <CourseCard key={product.id || index} product={product} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
