import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import LessonLayout from '../layouts/lesson';
import ExerciseLayout from '../layouts/exercise';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,

  // Lesson
  LearningPage,

  //Exercise
  ExercisePage,


  //
  Page500,
  Page403,
  Page404,
  UserPage,
  UserInfoPage,
  HomePage,
  AboutPage,
  CoursePage,
  CourseByUser,
  CourseDetailsPage,
  ComingSoonPage,
  MaintenancePage,
  CourseByUserDetailsPage,
  CourseOfCenterPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    // Học online
    {
      path: 'lop-hoc-cua-toi',
      children: [
        {
          element: <LessonLayout />,
          children: [
            {
              path: 'learning/:name',
              element: <LearningPage />,
            },
          ]
        }
      ]
    },
    // Đề thi
    {
      path: 'thi-truc-tuyen',
      children: [
        {
          element: <ExerciseLayout />,
          children: [
            {
              path: ':name',
              element: <ExercisePage />,
            },
          ],
        },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },

        {
          path: 'lop-hoc-cua-toi',
          children: [
            { element: <CourseByUser />, index: true },
            { path: ':name', element: <CourseByUserDetailsPage /> },
            // {
            //   path: 'learning/:name',
            //   element: <LearningPage />,
            // },
          ],
        },
        {
          path: 'lop-hoc-trung-tam',
          children: [
            { element: <CourseOfCenterPage />, index: true },
            { path: ':name', element: <CourseByUserDetailsPage /> },
          ],
        },
        {
          path: 'danh-sach-khoa-hoc',
          children: [
            { element: <CoursePage />, index: true },
            { path: ':name', element: <CourseDetailsPage /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/user/profile" replace />, index: true },

            { path: 'account', element: <UserPage /> },
            { path: 'history-learn', element: <UserInfoPage /> },
          ],
        },


      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },


  ]);
}
