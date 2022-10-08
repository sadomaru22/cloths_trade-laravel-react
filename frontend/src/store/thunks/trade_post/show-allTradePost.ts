import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, makePath, ResponseWithPagination } from 'utils/api';

export type ShowAllTradePostResponse = ResponseWithPagination<TradePost>;

export type ShowAllTradePostRequest = any;


export const showallTradePost = createAsyncThunk
   <
   ShowAllTradePostResponse,
   ShowAllTradePostRequest,
   AsyncThunkConfig>
   ('tradePost/showallTradePost', async (payload, thunkApi) => {
      //const userId = String(thunkApi.getState().auth.user?.id);   //一覧表示なので、これでいいはず、これってtsx側で宣言して引数で渡してるのでは？
      const userId = payload;
      console.log(userId);
      //const userId = "1";   // 9/29 一旦これで
      const path = makePath(['users', userId], ['trade_posts']);

      try {
         const response = await apiClient().get(path);
         return response?.data;
      } catch (error: any) {
         return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
      }
});

export default showallTradePost;