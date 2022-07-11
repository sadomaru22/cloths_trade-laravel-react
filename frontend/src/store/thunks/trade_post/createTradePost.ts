import { createAsyncThunk } from '@reduxjs/toolkit';
import { TradePost } from 'models';
import { apiClient, makePath } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';

export type CreateTaskCardResponse = {
   data: TradePost;
 };


export const createTradePost = createAsyncThunk('post/createPost', async (user: number, thunkApi) => {   //makePathいらんかも
   const config = {  //いけるかわからん
      headers: {
        'Content-type': 'application/json',
      },
    };
   try {
      return await fetch(`http://localhost/api/v1/users/${user}/trade_posts`, config).then((res) =>
        res.json()
      );
   } catch(error) {
      return thunkApi.rejectWithValue(makeRejectValue(error));
   }
 });