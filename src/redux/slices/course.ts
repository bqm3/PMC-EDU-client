import keyBy from 'lodash/keyBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { ICourseState } from '../../@types/course';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: ICourseState = {
  isLoading: false,
  error: null,
  course: null,
  dm_khoahoc: [],
  user_courses: [],
  class_courses: [],
  detai_class_courses: null,
  dt_diemdanh: [],
  await_courses: []
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LABELS
    getKhoaHocsSuccess(state, action) {
      state.isLoading = false;
      state.dm_khoahoc = action.payload;
    },

    getKhoaHocDetailSuccess(state, action){
      state.isLoading = false;
      state.detai_class_courses = action.payload;
    },

    getLopHocDetailSuccess(state, action){
      state.isLoading = false;
      state.course = action.payload;
    },
    getDiemDanhByKhoaHoc(state, action){
      state.isLoading = false;
      state.dt_diemdanh = action.payload;
    },

    getUsersCourseSuccess(state, action) {
      state.isLoading = false;
      state.user_courses = action.payload;
    },
    getClassCourseSuccess(state, action) {
      state.isLoading = false;
      state.class_courses = action.payload;
    },
    getClassCourseApprove(state, action) {
      state.isLoading = false;
      state.await_courses = action.payload;
    },
  },
 
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getKhoaHocs() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/khoahoc/client');
      dispatch(slice.actions.getKhoaHocsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUsersCourse() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/hocvien/regis-course', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      dispatch(slice.actions.getUsersCourseSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUsersAwaitCourse() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/hocvien/await-course', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      dispatch(slice.actions.getClassCourseApprove(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getClassCourse() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/lophoc', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      dispatch(slice.actions.getClassCourseSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDetailKhoaHoc(params: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/khoahoc/detail/${params}`);

      dispatch(slice.actions.getKhoaHocDetailSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDetailLopHoc(params: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/lophoc/detail/${params}`);

      dispatch(slice.actions.getLopHocDetailSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDiemDanhByKhoaHoc(name: string) {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/diemdanh/khoa-hoc/`, {
        params: {SlugTenkhoahoc: name}, 
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        
      })

      dispatch(slice.actions.getDiemDanhByKhoaHoc(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// export function getMails(params: Record<string, string>) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/mail/mails', { params });
//       dispatch(slice.actions.getMailsSuccess(response.data.mails));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

// export function getMail(mailId: string) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/mail/mail', {
//         params: { mailId },
//       });
//       dispatch(slice.actions.getMailSuccess(response.data.mail));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
