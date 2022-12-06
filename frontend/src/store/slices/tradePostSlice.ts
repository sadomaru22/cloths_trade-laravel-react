import { createSlice } from '@reduxjs/toolkit';
import { User } from 'models/User';
import {
  delsanSinsei,
  delsyuSinsei,
  juriSinsei,
  sankaSinsei,
} from 'store/thunks/sinsei';
import {
  ShowAllTradePostResponse,
  createTradePost,
  showallTradePost,
  showoneTradePost,
  ShowOneTradePostResponse,
  getOtherUser,
  GetOtherUserResponse,
  showallWithIsPending,
} from 'store/thunks/trade_post';
import {
  confirmedTradePost,
  deletePhotos,
  pastTradePost2,
  pendingTradePost,
  searchBySbTradePost2,
  updatePhotos,
  updateTrade,
  UpdateTradeResponse,
  showPendingUsers,
  showConfirmedUsers,
} from 'store/thunks/trade_post2';

export type TradePostState = {
  loading: boolean;
  success: boolean;
  message: string;
  url: string;
  users: User[]; //ShowPending&ConfirmedUserResponse用
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
    builder.addCase(showallWithIsPending.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(showallWithIsPending.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showallWithIsPending.fulfilled, (state, action) => {
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
      state.url = action.payload.url;
    });
    builder.addCase(createTradePost.rejected, (state, action) => {
      state.loading = false;
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
      state.loading = false;
    });
    builder.addCase(getOtherUser.rejected, (state) => {
      state.loading = false;
    });

    //from 'store/thunks/trade_post2'
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
    });
    builder.addCase(deletePhotos.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(confirmedTradePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(confirmedTradePost.fulfilled, (state, action) => {
      state.data = action.payload.data || [];
      state.links = action.payload.links || {};
      state.meta = action.payload.meta || {};
      state.loading = false;
    });
    builder.addCase(confirmedTradePost.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(pendingTradePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(pendingTradePost.fulfilled, (state, action) => {
      state.data = action.payload.data || [];
      state.links = action.payload.links || {};
      state.meta = action.payload.meta || {};
      state.loading = false;
    });
    builder.addCase(pendingTradePost.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(showPendingUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showPendingUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.loading = false;
    });
    builder.addCase(showPendingUsers.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(showConfirmedUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showConfirmedUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.loading = false;
    });
    builder.addCase(showConfirmedUsers.rejected, (state, action) => {
      state.loading = false;
    });

    //from 'store/thunks/sinsei'
    builder.addCase(sankaSinsei.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sankaSinsei.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.url = action.payload.url;
      state.loading = false;
    });
    builder.addCase(sankaSinsei.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(juriSinsei.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(juriSinsei.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.loading = false;
    });
    builder.addCase(juriSinsei.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(delsyuSinsei.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(delsyuSinsei.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.loading = false;
    });
    builder.addCase(delsyuSinsei.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(delsanSinsei.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(delsanSinsei.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    });
    builder.addCase(delsanSinsei.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//redux Toolkitでは自動で同名のAction Creatorを作成するため、dispatchで指定するためreducerと同じ名前のものをexportする
// eslint-disable-next-line no-empty-pattern
export const {} = tradePostSlice.actions; //もしあれば
