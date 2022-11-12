import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, ResponseWithPagination } from 'utils/api';

export type SearchBySbTradePost2Response = ResponseWithPagination<TradePost>;

//export type SearchBySbTradePost2Request = FormEvent<HTMLFormElement>;
export type SearchBySbTradePost2Request = string | undefined;

export const searchBySbTradePost2 = createAsyncThunk<
  SearchBySbTradePost2Response,
  SearchBySbTradePost2Request,
  AsyncThunkConfig
>('tradePost/searchBySbTradePost2', async (payload, thunkApi) => {
  //payloadにlabelが渡ってくる。
  const place = payload;
  console.log(place);
  //const path = makePath(['trade_posts', place], ['searchBySb']);
  const path = `/trade_posts/searchBySb/${place}`;

  try {
    //await apiClient({ apiRoute: false }).get(GET_CSRF_TOKEN_PATH);
    const response = await apiClient().get(path);

    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default searchBySbTradePost2;
