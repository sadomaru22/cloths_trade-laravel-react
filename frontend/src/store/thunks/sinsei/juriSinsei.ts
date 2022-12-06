import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { User } from 'models/User';

export type JuriSinseiResponse = {
  users: User[];
};

export type JuriSinseiRequest = {
  trade_post_id: string;
  user_id: string | null;
  name: string;
};

export const juriSinsei = createAsyncThunk<
  JuriSinseiResponse,
  JuriSinseiRequest,
  AsyncThunkConfig
>('tradePost/juriSinsei', async (payload, thunkApi) => {
  console.log(payload);
  const path = '/sinsei/juri';

  try {
    const response = await apiClient().post(path, payload); // SinseiController@juriSinsei
    const { setFlash } = await import('store/slices/authSlice');
    if (response?.data) {
      thunkApi.dispatch(
        setFlash({
          type: 'success',
          message: `${payload.name}さんの参加が確定しました。`,
        })
      );
    }
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
