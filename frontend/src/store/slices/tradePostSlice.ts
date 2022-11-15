import { createSlice } from '@reduxjs/toolkit';
import {
  ShowAllTradePostResponse,
  createTradePost,
  showallTradePost,
  showoneTradePost,
  ShowOneTradePostResponse,
  getOtherUser,
  GetOtherUserResponse,
} from 'store/thunks/trade_post';
import { searchBySbTradePost2 } from 'store/thunks/trade_post2';

export type TradePostState = {
  loading: boolean;
  success: boolean;
  message: string;
  url: string;
  //infoBox: { open: boolean } & InfoBoxAction;
} & ShowAllTradePostResponse &
  ShowOneTradePostResponse &
  GetOtherUserResponse;

export const initialTradePostState = {
  loading: false,
  data: [],
  error: false,
  success: false,
  message: '',
  url: '',
  //dataOne: {},
  //photos: [],
  links: {} as TradePostState['links'],
  meta: {} as TradePostState['meta'],
} as unknown as TradePostState;

export const tradePostSlice = createSlice({
  name: 'tradePost', //これがActiontypeと同じ、あと以下は従来のReduxと変わらない
  initialState: initialTradePostState,
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
      console.log(state.data);
    });
    builder.addCase(showallTradePost.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(showoneTradePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showoneTradePost.fulfilled, (state, action) => {
      //state.dataOne = action.payload.dataOne;
      state.photos = action.payload.photos;
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
      console.log(action.payload.message);
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
      // state.url = ''; //初期化
      // state.success = false;
    });
    builder.addCase(searchBySbTradePost2.fulfilled, (state, action) => {
      state.data = action.payload.data || [];
      state.links = action.payload.links || {};
      state.meta = action.payload.meta || {};
      // state.success = action.payload.success;
      // state.url = action.payload.url;
      state.loading = false;
      console.log(state.data);
    });
    builder.addCase(searchBySbTradePost2.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getOtherUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOtherUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      console.log(action.payload.user + '=action.payload.user');
      console.log(state.user + '=state.user');
    });
    builder.addCase(getOtherUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

//redux Toolkitでは自動で同名のAction Creatorを作成するため、dispatchで指定するためreducerと同じ名前のものをexportする
// eslint-disable-next-line no-empty-pattern
export const {} = tradePostSlice.actions; //もしあれば
