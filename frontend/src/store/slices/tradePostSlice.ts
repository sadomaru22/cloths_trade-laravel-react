import { createSlice } from '@reduxjs/toolkit';

import {createTradePost} from 'store/thunks/trade_post';


type AppState = {
   notFound: boolean;
 };
 
 const initialState = {} as AppState;

 export const tradePostSlice = createSlice({
   name: 'tradePost',   //これがActiontypeと同じ、あと以下は従来のReduxと変わらない
   initialState: {
      users: [],
      loading: false,
      error: false,
   },
   reducers: {},
   extraReducers: (builder) =>{
      builder.addCase(createTradePost.pending, (state) => {
         state.loading = true;
      });
      
      builder.addCase(createTradePost.fulfilled, (state, action) => {
         state.loading = false;
         state.users = action.payload;
      });
      builder.addCase(createTradePost.pending, (state) => {
         state.loading = false;
         state.error = true;
      });

   }
 });

 export const { } = tradePostSlice.actions;  //もしあれば