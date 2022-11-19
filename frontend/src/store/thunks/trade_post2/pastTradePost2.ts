import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, ResponseWithPagination } from 'utils/api';

export type PastTradePost2Response = ResponseWithPagination<TradePost>;

export type PastTradePost2Request = {
  id: any;
  page?: string;
};

export const pastTradePost2 = createAsyncThunk<
  PastTradePost2Response,
  PastTradePost2Request,
  AsyncThunkConfig
>('tradePost/pastTradePost2', async (payload, thunkApi) => {
  const { id, page } = payload;
  console.log(id);
  const path = `/trade_posts/past/${id}`;

  try {
    const response = await apiClient().get(path, { params: { page } });
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default pastTradePost2;
