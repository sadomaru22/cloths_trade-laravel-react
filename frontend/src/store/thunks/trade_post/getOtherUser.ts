import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'models/User';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient } from 'utils/api';

export type GetOtherUserResponse = {
  user: User;
};

export type GetOtherUserRequest = string;

export const getOtherUser = createAsyncThunk<
  GetOtherUserResponse,
  GetOtherUserRequest,
  AsyncThunkConfig
>('tradePost/getOtherUser', async (payload, thunkApi) => {
  const other_userId = payload; //onclick時に取るt_ID
  console.log(other_userId);
  const path = `/get-other-user/${other_userId}`;

  try {
    const response = await apiClient().get(path);
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default getOtherUser;
