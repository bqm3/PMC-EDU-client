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
  dm_khoahoc: [],
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

  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getKhoaHocs() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/khoahoc');
      dispatch(slice.actions.getKhoaHocsSuccess(response.data.data));
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
