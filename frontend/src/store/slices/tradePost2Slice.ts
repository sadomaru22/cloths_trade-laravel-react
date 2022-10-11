import { createSlice } from '@reduxjs/toolkit';
import {ShowAllTradePostResponse} from 'store/thunks/trade_post';
import {
   searchBySbTradePost2,
} from 'store/thunks/trade_post2';

//🌟使わない！！

type TradePostState = {
   loading: boolean;
 } & ShowAllTradePostResponse;
 
 const initialState = {      
    loading: false,
    data: [],
    error: false,
    links: {} as TradePostState['links'],  //必須
    meta: {} as TradePostState['meta'],    //必須
} as TradePostState;

 export const tradePostSlice = createSlice({
   name: 'tradePost2',
   initialState,
   reducers: {},
   extraReducers: (builder) =>{
      builder.addCase(searchBySbTradePost2.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(searchBySbTradePost2.fulfilled, (state, action) => {
         state.data = action.payload.data || [];
         state.links = action.payload.links || {};
         state.meta = action.payload.meta || {};
         state.loading = false;
         console.log(state.data);
      });
      builder.addCase(searchBySbTradePost2.rejected, (state) => {
         state.loading = false;
      });


   }
 });

 // eslint-disable-next-line no-empty-pattern
 export const {} = tradePostSlice.actions;