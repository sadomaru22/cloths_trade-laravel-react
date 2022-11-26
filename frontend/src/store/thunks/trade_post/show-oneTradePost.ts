import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, makePath } from 'utils/api';

export type ShowOneTradePostResponse = {
  dataOne: TradePost;
  photos: string[]; //いらんかも
};

export type ShowOneTradePostRequest = string;

export const showoneTradePost = createAsyncThunk<
  ShowOneTradePostResponse,
  ShowOneTradePostRequest,
  AsyncThunkConfig
>('tradePost/showoneTradePost', async (payload, thunkApi) => {
  //const {userId, trade_post_id} = payload;
  const userId = String(thunkApi.getState().auth.user?.id); //userIDはURIからではなくcreateTradePostなどと同様にこの形式で取ればいい。
  const trade_post_id = payload; //onclick時に取るt_ID
  console.log(trade_post_id + 'from show-one.ts');
  const path = makePath(['users', userId], ['trade_posts', trade_post_id]);

  try {
    const response = await apiClient().get(path);
    return response?.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
  }
});

export default showoneTradePost;
