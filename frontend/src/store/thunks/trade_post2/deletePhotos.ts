import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
//import { TradePost } from 'models';
import { Image } from 'models';

export type DeletePhotosResponse = {
  photos: Image[];
};

export type DeletePhotosRequest = {
  trade_post_id: string;
  id: string[];
};

export const deletePhotos = createAsyncThunk<
  DeletePhotosResponse,
  DeletePhotosRequest,
  AsyncThunkConfig
>('tradePost/deletePhotos', async (payload, thunkApi) => {
  console.log(payload);
  //const { id, photos } = payload;
  const path = '/trade_posts/delete_photos';

  try {
    const response = await apiClient().post(path, payload); //TradePost2Controller@deletePhotos
    const { setFlash } = await import('store/slices/authSlice');
    if (response?.data) {
      thunkApi.dispatch(
        setFlash({
          type: 'success',
          message: '選択された画像を削除しました',
        })
      );
    }
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
