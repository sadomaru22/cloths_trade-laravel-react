import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, ResponseWithPagination } from 'utils/api';

export type SearchBySbTradePost2Response = ResponseWithPagination<TradePost>;

export type SearchBySbTradePost2Request = {
  place: any;
  page?: string;
};

export const searchBySbTradePost2 = createAsyncThunk<
  SearchBySbTradePost2Response,
  SearchBySbTradePost2Request,
  AsyncThunkConfig
>('tradePost/searchBySbTradePost2', async (payload, thunkApi) => {
  const { place, page } = payload;
  const path = `/trade_posts/searchBySb/${place}`;

  try {
    const response = await apiClient().get(path, { params: { page } });
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default searchBySbTradePost2;
