import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, makePath, ResponseWithPagination } from 'utils/api';

export type FetchTradePostResponse = ResponseWithPagination<TradePost>;

export type FetchTradePostRequest = {
   userId: string;
   page?: string;
   //data :[]
 };


export const showallTradePost = createAsyncThunk
   <
   FetchTradePostResponse,
   FetchTradePostRequest,
   AsyncThunkConfig>
   ('tradePost/showallTradePost', async (_, thunkApi) => {  //ここでpayloadに渡せてないのでは？
      const userId = String(thunkApi.getState().auth.user?.id); 
      const path = makePath(['users', userId], ['trade_posts']);

      try {
         const response = await apiClient().get(path);
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
      }
});