import { createSlice } from '@reduxjs/toolkit';

import {
   ShowAllTradePostResponse,
   createTradePost,
   showallTradePost,
   showoneTradePost
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

      builder.addCase(showoneTradePost.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(showoneTradePost.fulfilled, (state, action) => {
         state.data.push(action.payload.data); //= action.payload.data;   これでいけるのか？？
         state.loading = false;
      });
      builder.addCase(showoneTradePost.rejected, (state) => {
         state.loading = false;
      });

      builder.addCase(createTradePost.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createTradePost.fulfilled, (state, action) => {
         state.loading = false;
         const newDoc = action.payload.data;
         state.data = [...state.data, { ...newDoc }];   //配列
        // state.data = action.payload;
      });
      builder.addCase(createTradePost.rejected, (state) => {
         state.loading = false;
         //state.error = true;   //errorはShowAllTradePostResponseにないらしい
      });

   }
 });

 //redux Toolkitでは自動で同名のAction Creatorを作成するため、dispatchで指定するためreducerと同じ名前のものをexportする
 export const { } = tradePostSlice.actions;  //もしあれば