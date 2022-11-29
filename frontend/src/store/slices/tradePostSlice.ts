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
  deletePhotos,
  pastTradePost2,
  searchBySbTradePost2,
  updatePhotos,
  updateTrade,
  UpdateTradeResponse,
} from 'store/thunks/trade_post2';
//import { AuthState, FlashNotificationProps } from './authSlice';

export type TradePostState = {
  loading: boolean;
  success: boolean;
  message: string;
  url: string;
  //flash: FlashNotificationProps[];
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
  //flash: [] as AuthState['flash'],
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
    });
    builder.addCase(showallTradePost.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(showoneTradePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showoneTradePost.fulfilled, (state, action) => {
      state.dataOne = action.payload.dataOne;
      state.photos = action.payload.photos;
      state.loading = false;
      console.log('showone from slice');
    });
    builder.addCase(showoneTradePost.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createTradePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTradePost.fulfilled, (state, action) => {
      state.loading = false;
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
    });
    builder.addCase(pastTradePost2.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateTrade.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTrade.fulfilled, (state, action) => {
      state.loading = false;
      state.dataOne = action.payload.dataOne;
      console.log(state.dataOne);
    });
    builder.addCase(updateTrade.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updatePhotos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.photos = action.payload.photos;
      console.log(state.photos);
    });
    builder.addCase(updatePhotos.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deletePhotos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.photos = action.payload.photos;
      console.log(state.photos);
      console.log('from deletePhotos.fullfilled');
    });
    builder.addCase(deletePhotos.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//redux Toolkitでは自動で同名のAction Creatorを作成するため、dispatchで指定するためreducerと同じ名前のものをexportする
// eslint-disable-next-line no-empty-pattern
export const {} = tradePostSlice.actions; //もしあれば
