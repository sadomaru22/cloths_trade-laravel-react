import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { ShowUsersResponse } from '.';

export type ShowConfirmedUsersRequest = string;

export const showConfirmedUsers = createAsyncThunk<
  ShowUsersResponse,
  ShowConfirmedUsersRequest,
  AsyncThunkConfig
>('tradePost/showConfirmedUsers', async (payload, thunkApi) => {
  console.log(payload);
  const id = payload;
  const path = `/trade_posts/confirmedUsers/${id}`;

  try {
    const response = await apiClient().get(path); //TradePost2Controller@showConfirmedUsers
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
