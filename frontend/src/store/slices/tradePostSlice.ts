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
import {
  pastTradePost2,
  searchBySbTradePost2,
  updateTrade,
  UpdateTradeResponse,
} from 'store/thunks/trade_post2';
import { FlashNotificationProps } from './authSlice';

export type TradePostState = {
  loading: boolean;
  success: boolean;
  message: string;
  url: string;
  flash: FlashNotificationProps[];
  //infoBox: { open: boolean } & InfoBoxAction;
} & ShowAllTradePostResponse &
  ShowOneTradePostResponse &
  GetOtherUserResponse &
  UpdateTradeResponse;

export const initialTradePostState = {
  loading: false,
  data: [],
  error: false,
  success: false,
  message: '',
  url: '',
  flash: [],
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

    builder.addCase(pastTradePost2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(pastTradePost2.fulfilled, (state, action) => {
      state.data = action.payload.data || [];
      state.links = action.payload.links || {};
      state.meta = action.payload.meta || {};
      state.loading = false;
      console.log(state.data);
    });
    builder.addCase(pastTradePost2.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateTrade.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTrade.fulfilled, (state, action) => {
      state.loading = false;
      //const newDoc = action.payload.data;
      //state.data = [...state.data, { ...newDoc }]; //配列
      const index = action.payload.dataOne.id;
      const index_number = Number(index);
      //state.dataOne = action.payload.dataOne;
      state.data[index_number] = action.payload.dataOne;
      console.log(state.data[index_number]);
      state.flash.push({
        type: 'success',
        message: '投稿の内容を変更しました',
      });
    });
    builder.addCase(updateTrade.rejected, (state, action) => {
      state.loading = false;
      //state.error = true;   //errorはShowAllTradePostResponseにないらしい
    });
  },
});

//redux Toolkitでは自動で同名のAction Creatorを作成するため、dispatchで指定するためreducerと同じ名前のものをexportする
// eslint-disable-next-line no-empty-pattern
export const {} = tradePostSlice.actions; //もしあれば
