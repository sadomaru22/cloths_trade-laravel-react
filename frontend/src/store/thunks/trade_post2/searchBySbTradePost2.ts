import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, ResponseWithPagination } from 'utils/api';

export type SearchBySbTradePost2Response = ResponseWithPagination<TradePost>;

//export type SearchBySbTradePost2Request = FormEvent<HTMLFormElement>;
export type SearchBySbTradePost2Request = {
  place: any;
  page?: string;
};

export const searchBySbTradePost2 = createAsyncThunk<
  SearchBySbTradePost2Response,
  SearchBySbTradePost2Request,
  AsyncThunkConfig
>('tradePost/searchBySbTradePost2', async (payload, thunkApi) => {
  //payloadにlabelが渡ってくる。
  const { place, page } = payload;
  console.log(place);
  //const path = makePath(['trade_posts', place], ['searchBySb']);
  const path = `/trade_posts/searchBySb/${place}`;

  try {
    const response = await apiClient().get(path, { params: { page } });
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default searchBySbTradePost2;
