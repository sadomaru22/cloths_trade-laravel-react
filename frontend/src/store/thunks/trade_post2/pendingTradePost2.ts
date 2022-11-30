import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient } from 'utils/api';
import {
  ShowAllTradePostRequest,
  ShowAllTradePostResponse,
} from '../trade_post';

export const pendingTradePost = createAsyncThunk<
  ShowAllTradePostResponse,
  ShowAllTradePostRequest,
  AsyncThunkConfig
>('tradePost/pendingTradePost', async (payload, thunkApi) => {
  const { userId, page } = payload;
  console.log(userId);
  const path = `/trade_posts/pending/${userId}`;

  try {
    const response = await apiClient().get(path, { params: { page } }); //これに関してはなかなか2ページ目まで行くことないと思う。
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default pendingTradePost;
