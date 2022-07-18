import { createSlice } from '@reduxjs/toolkit';

import {
   FetchTradePostResponse,
   createTradePost,
   showallTradePost
} from 'store/thunks/trade_post';


type TradePostState = {
   loading: boolean;
   //infoBox: { open: boolean } & InfoBoxAction;
   //docs: TaskBoardsCollection;
 } & FetchTradePostResponse;
 
 const initialState = {      
    loading: false,
    data: [],
    error: false,
    links: {} as TradePostState['links'],
    meta: {} as TradePostState['meta'],
} as TradePostState;

 export const tradePostSlice = createSlice({
   name: 'tradePost',   //これがActiontypeと同じ、あと以下は従来のReduxと変わらない
   initialState,
   reducers: {},
   extraReducers: (builder) =>{
      builder.addCase(showallTradePost.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(showallTradePost.fulfilled, (state, action) => {
         state.data = action.payload.data || [];
         state.links = action.payload.links || {};
         state.meta = action.payload.meta || {};
         state.loading = false;
      });
      builder.addCase(showallTradePost.rejected, (state) => {
         state.loading = false;
      });
      builder.addCase(createTradePost.pending, (state) => {
         state.loading = true;
      });
      
      builder.addCase(createTradePost.fulfilled, (state, action) => {
         state.loading = false;
         const newDoc = action.payload.data;
         state.data = [...state.data, { ...newDoc }];     //🌟ここのエラーはとりあえず消えた！！！
        // state.data = action.payload;
      });
      builder.addCase(createTradePost.pending, (state) => {
         state.loading = false;
         //state.error = true;   //errorはFetchTradePostResponseにないらしい
      });

   }
 });

 export const { } = tradePostSlice.actions;  //もしあれば