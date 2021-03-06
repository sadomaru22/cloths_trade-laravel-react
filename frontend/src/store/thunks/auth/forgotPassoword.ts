import { createAsyncThunk } from '@reduxjs/toolkit';

import { GET_CSRF_TOKEN_PATH, FORGOT_PASSWORD_PATH } from 'config/api';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';

/*
パスワードを忘れた場合に、emailをとってくるメソッド。
*/

export type ForgotPasswordResponse = {};

export type ForgotPasswordRequest = {
  email: string;
};

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  AsyncThunkConfig
>('auth/forgotPassword', async (payload, thunkApi) => {
  const { email } = payload;
  try {
    await apiClient({ apiRoute: false }).get(GET_CSRF_TOKEN_PATH);
    await apiClient().post(FORGOT_PASSWORD_PATH, { email });
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});