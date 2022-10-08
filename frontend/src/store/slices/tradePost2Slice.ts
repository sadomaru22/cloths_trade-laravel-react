import { createSlice } from '@reduxjs/toolkit';

import {
   ShowAllTradePostResponse,
   showallTradePost,
} from 'store/thunks/trade_post';


type TradePostState = {
   loading: boolean;
   //infoBox: { open: boolean } & InfoBoxAction;
   //docs: TaskBoardsCollection;
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


   }
 });

 export const { } = tradePostSlice.actions;