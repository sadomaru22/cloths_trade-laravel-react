import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, makePath, ResponseWithPagination } from 'utils/api';

//Pending, Confirmed, OtherIchiranにて使用
export type ShowAllTradePostResponse = ResponseWithPagination<TradePost>;

export type ShowAllTradePostRequest = {
  userId: any;
  page?: string;
};

export const showallTradePost = createAsyncThunk<
  ShowAllTradePostResponse,
  ShowAllTradePostRequest,
  AsyncThunkConfig
>('tradePost/showallTradePost', async (payload, thunkApi) => {
  const { userId, page } = payload;
  console.log(userId);
  const path = makePath(['users', userId], ['trade_posts']);

  try {
    const response = await apiClient().get(path, { params: { page } });
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default showallTradePost;
