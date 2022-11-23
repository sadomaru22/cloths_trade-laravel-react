import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { TradePost } from 'models';

export type UpdateTradeResponse = {
  dataOne: TradePost;
};

export type UpdateTradeRequest = Pick<TradePost, 'title'> &
  Partial<Pick<TradePost, 'date'>> &
  Partial<Pick<TradePost, 'maxCapa'>> &
  Partial<Pick<TradePost, 'place'>> &
  Partial<Pick<TradePost, 'description'>> & { trade_post_id: string };

export const updateTrade = createAsyncThunk<
  UpdateTradeResponse,
  UpdateTradeRequest,
  AsyncThunkConfig
>('tradePost/updateTrade', async (payload, thunkApi) => {
  //const userId: any = localStorage.getItem('userId');
  const path = '/trade_posts/edit_others';
  console.log(payload.trade_post_id + '=payload.trade_post_id');

  //画像は別のAPi処理になるので不要
  //   const config = {
  //     headers: {
  //       'Content-type': 'multipart/form-data', //画像の送信には必須。
  //     },
  //   };
  try {
    const response = await apiClient().put(path, payload); //TradePostController@update
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
