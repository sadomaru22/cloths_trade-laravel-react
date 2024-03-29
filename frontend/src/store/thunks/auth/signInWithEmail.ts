import { createAsyncThunk } from '@reduxjs/toolkit';

import { GET_CSRF_TOKEN_PATH, SIGNIN_PATH } from 'config/api';
import { User } from 'models/User';
import { apiClient } from 'utils/api';
import { isHttpException } from 'utils/api/errors';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { fetchAuthUser } from './fetchAuthUser';

export type SignInResponse = {
  user: User;
  verified?: true;
};

export type SignInRequest = {
  email: string;
  password: string;
  remember?: string;
};

export const signInWithEmail = createAsyncThunk<
  SignInResponse,
  SignInRequest,
  AsyncThunkConfig
>('auth/signInWithEmail', async (payload, thunkApi) => {
  const { email, password, remember } = payload;
  try {
    //2つのawaitどっちかでこけたときに拾う必要があるからtry&catchは必須
    await apiClient({ apiRoute: false }).get(GET_CSRF_TOKEN_PATH); //まずはsanctumの認証を挟んで
    //const response =
    await apiClient().post(SIGNIN_PATH, {
      //それがOKだったら第二引数に指定された3つを元にLaravel側でログイン処理
      email,
      password,
      remember,
    });
    const response = await apiClient().get('/get-user');
    return response?.data;
  } catch (error) {
    // 認証用メールから遷移して、認証リンクが無効だった場合、(9/28)今のところ無視で
    if (isHttpException(error) && error.response.status === 403) {
      const { setFlash } = await import('store/slices/authSlice');
      thunkApi.dispatch(fetchAuthUser());
      thunkApi.dispatch(
        setFlash({ type: 'warning', message: '認証に失敗しました' })
      );
    }
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
