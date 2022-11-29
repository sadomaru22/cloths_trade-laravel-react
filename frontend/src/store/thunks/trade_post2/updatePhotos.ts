import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { Image, TradePost } from 'models';

export type UpdatePhotosResponse = {
  photos: Image[];
};

export type UpdatePhotosRequest = Pick<TradePost, 'photos'> & { id: string };

export const updatePhotos = createAsyncThunk<
  UpdatePhotosResponse,
  UpdatePhotosRequest,
  AsyncThunkConfig
>('tradePost/updatePhotos', async (payload, thunkApi) => {
  console.log(payload);
  //const { id, photos } = payload;
  const path = '/trade_posts/edit_photos';

  const config = {
    headers: {
      'Content-type': 'multipart/form-data', //画像の送信には必須。
    },
  };
  try {
    const response = await apiClient().post(path, payload, config); //TradePost2Controller@updatePhotos
    const { setFlash } = await import('store/slices/authSlice');
    if (response?.data) {
      thunkApi.dispatch(
        setFlash({
          type: 'success',
          message: '投稿に使用されている画像を変更しました',
        })
      );
    }
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
