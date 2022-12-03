import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient } from 'utils/api';
import {
  ShowAllTradePostRequest,
  ShowAllTradePostResponse,
} from '../trade_post';

//MyIchiranにて使用
export const showallWithIsPending = createAsyncThunk<
  ShowAllTradePostResponse,
  ShowAllTradePostRequest,
  AsyncThunkConfig
>('tradePost/showallWithIsPending', async (payload, thunkApi) => {
  const { userId, page } = payload;
  const path = `/trade_posts/withIsPending/${userId}`;

  try {
    const response = await apiClient().get(path, { params: { page } });
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default showallWithIsPending;
