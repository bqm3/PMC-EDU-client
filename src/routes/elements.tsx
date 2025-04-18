import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// LESSON
export const LearningPage = Loadable(lazy(() => import('../pages/lesson/LearningPage')));

// EXERCISE 
export const ExercisePage = Loadable(lazy(() => import('../pages/exercise/ExercisePage')));

// HOME
export const CourseByUser = Loadable(lazy(() => import('../pages/CourseByUser')));
export const CourseOfCenterPage = Loadable(lazy(() => import('../pages/CourseOfCenterPage')));
export const CoursePage = Loadable(lazy(() => import('../pages/CoursePage')));
export const CourseDetailsPage = Loadable(lazy(() => import('../pages/CourseDetailsPage')));
export const CourseByUserDetailsPage = Loadable(lazy(() => import('../pages/CourseByUserDetailsPage')));


// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const UserPage = Loadable(lazy(() => import('../pages/UserAccountPage')));
export const UserInfoPage = Loadable(lazy(() => import('../pages/UserInfoPage')));
export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
