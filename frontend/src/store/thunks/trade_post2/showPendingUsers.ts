import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { User } from 'models/User';

//SankaJuriのレンダリング時に使用
export type ShowUsersResponse = {
  users: User[];
};

export type ShowPendingUsersRequest = string;

export const showPendingUsers = createAsyncThunk<
  ShowUsersResponse,
  ShowPendingUsersRequest,
  AsyncThunkConfig
>('tradePost/showPendingUsers', async (payload, thunkApi) => {
  console.log(payload);
  const id = payload;
  const path = `/trade_posts/pendingUsers/${id}`;

  try {
    const response = await apiClient().get(path); //TradePost2Controller@showPendingUsers
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
