import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { apiClient, makePath } from 'utils/api';
import { makeRejectValue } from 'store/thunks/utils';

// export type  CreateTradePostRequest = {
//    title: string;
//    date: string;
//    photos: string;
//    maxCapa: number;
//    place: string;
//    description: string;
// }

export type CreateTradePostRequest = Pick<TradePost, 'title'> &
  Partial<Pick<TradePost, 'date'>> &
  Partial<Pick<TradePost, 'photos'>> &
  Partial<Pick<TradePost, 'maxCapa'>> &
  Partial<Pick<TradePost, 'place'>> &
  Partial<Pick<TradePost, 'description'>>;

export type CreateTradePostResponse = {
  //data: TradePost;
  success: boolean;
  url: string;
  message: string;
};

export const createTradePost = createAsyncThunk<
  CreateTradePostResponse, //payloadCreator の返り値の型
  CreateTradePostRequest, // payloadCreator の第1引数(arg)の型、ここでいうpayload?
  AsyncThunkConfig
>('tradePost/createTradePost', async (payload, thunkApi) => {
  //payloadCreator の第2引数(thunkApi)のための型
  //const userId = String(thunkApi.getState().auth.user?.id); //ログイン中のuseridは常にこれで取れる。
  const userId: any = localStorage.getItem('userId'); //こっちだとリロードしても大丈夫
  const path = makePath(['users', userId], ['trade_posts']);
  console.log('createTradePost');

  const config = {
    //多分いける(https://zenn.dev/luvmini511/articles/c9cdb77a145f4d)ここでやってた
    headers: {
      'Content-type': 'multipart/form-data', //画像の送信には必須。
    },
  };
  try {
    const response = await apiClient().post(path, payload, config);
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error)); //この時、slice側ではrejectedに行く
  }
});

export default createTradePost;
