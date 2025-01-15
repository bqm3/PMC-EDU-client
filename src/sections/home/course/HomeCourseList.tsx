// @mui
import { Box, BoxProps } from '@mui/material';
// @type
import { IProduct } from '../../../@types/product';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import HomeCourseCard from './HomeCourseCard';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  courses: any;
  loading: boolean;
}

export default function ShopProductList({ courses, loading, ...other }: Props) {
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
      {(loading ? [...Array(8)] : courses.slice(0, 8)).map((course: any, index: number) =>
        course ? (
          <HomeCourseCard key={course.ID_Khoahoc} course={course} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
