import { createSlice } from '@reduxjs/toolkit';

import {
  ShowAllTradePostResponse,
  createTradePost,
  showallTradePost,
  showoneTradePost,
} from 'store/thunks/trade_post';
import { searchBySbTradePost2 } from 'store/thunks/trade_post2';

type TradePostState = {
  loading: boolean;
  success: boolean;
  message: string;
  url: string;
  //infoBox: { open: boolean } & InfoBoxAction;
  //docs: TaskBoardsCollection;
} & ShowAllTradePostResponse;

const initialState = {
  loading: false,
  data: [],
  error: false,
  success: false, //新規追加下三つ(CreateTradePostResponse)
  message: '',
  url: '',
  links: {} as TradePostState['links'], //必須(ページネーション)
  meta: {} as TradePostState['meta'], //必須(ページネーション)
} as TradePostState;

export const tradePostSlice = createSlice({
  name: 'tradePost', //これがActiontypeと同じ、あと以下は従来のReduxと変わらない
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      //const newDoc = action.payload.data;
      //state.data = [...state.data, { ...newDoc }]; //配列
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.url = action.payload.url;
    });
    builder.addCase(createTradePost.rejected, (state, action) => {
      state.loading = false;
      //state.error = true;   //errorはShowAllTradePostResponseにないらしい
    });

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
  },
});

//redux Toolkitでは自動で同名のAction Creatorを作成するため、dispatchで指定するためreducerと同じ名前のものをexportする
// eslint-disable-next-line no-empty-pattern
export const {} = tradePostSlice.actions; //もしあれば
