import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'store/thunks/config';
import { TradePost } from 'models';
import { makeRejectValue } from 'store/thunks/utils';
import { apiClient, makePath, ResponseWithPagination } from 'utils/api';

export type SearchTradePost2Response = ResponseWithPagination<TradePost>;

export type SearchTradePost2Request = string;


export const searchTradePost2 = createAsyncThunk
   <
   SearchTradePost2Response,
   SearchTradePost2Request,
   AsyncThunkConfig>
   ('tradePost2/searchTradePost2', async (payload, thunkApi) => {
      //const userId = String(thunkApi.getState().auth.user?.id);   //一覧表示なので、これでいいはず、これってtsx側で宣言して引数で渡してるのでは？
      const place = payload;
      console.log(place);
      //const path = makePath(['users', userId], ['trade_posts']);
      const path = '/api/v1/trade_posts/search';

      try {
         const response = await apiClient().get(path);
         return response?.data;
      } catch (error: any) {
         return thunkApi.rejectWithValue(makeRejectValue(error.response.data));
      }
});

export default searchTradePost2;