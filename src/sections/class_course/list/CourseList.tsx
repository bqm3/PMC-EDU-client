// @mui
import { Box, BoxProps } from '@mui/material';
// @type
import { IDangKy, IHocvien, ILophoc } from 'src/@types/course';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  classes: ILophoc[];
  user_courses: IHocvien[];
  await_courses: IDangKy[];
  loading: boolean;
}

export default function CourseList({ classes, loading, user_courses, await_courses, ...other }: Props) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(2, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : classes).map((item, index) =>
        item ? (
          <CourseCard key={item?.ID_Lophoc || index} data={item} user_courses={user_courses} await_courses={await_courses} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
