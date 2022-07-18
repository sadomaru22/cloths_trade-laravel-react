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

export type CreateTradePostResponse = 
//CreateTradePostRequest;
{data: TradePost;};

export const createTradePost = createAsyncThunk
<
CreateTradePostResponse,  //payloadCreator の返り値の型
CreateTradePostRequest,  // payloadCreator の第1引数(arg)の型
AsyncThunkConfig>        //payloadCreator の第2引数(thunkApi)のための型
('tradePost/createTradePost', async (payload, thunkApi) => {   
   const userId = String(thunkApi.getState().auth.user?.id);   //ログイン中のuseridは常にこれで取れる。
   const path = makePath(['users', userId], ['trade_posts']);

   const config = {  //いけるかわからん
      headers: {
        'Content-type': 'application/json',  //APIと認識させるためにつける。Postmanでやったやつ。
      },
    };
   try {     
      const response = await apiClient().post(path, payload, config);
      return response?.data;
   } catch(error) {
      return thunkApi.rejectWithValue(makeRejectValue(error));
   }
 });

 export default createTradePost;