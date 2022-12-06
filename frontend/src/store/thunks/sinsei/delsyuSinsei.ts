import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';
import { User } from 'models/User';

//SankaJuri.tsxの「却下」ボタン押下時
export type DelsyuSinseiResponse = {
  users: User[];
};

export type DelsyuSinseiRequest = {
  trade_post_id: string;
  user_id: string | null;
  name: string;
};

export const delsyuSinsei = createAsyncThunk<
  DelsyuSinseiResponse,
  DelsyuSinseiRequest,
  AsyncThunkConfig
>('tradePost/delsyuSinsei', async (payload, thunkApi) => {
  console.log(payload);
  const path = '/sinsei/delsyu';

  try {
    const response = await apiClient().post(path, payload); //SinseiController@delsyuSinsei
    const { setFlash } = await import('store/slices/authSlice');
    if (response?.data) {
      thunkApi.dispatch(
        setFlash({
          type: 'success',
          message: `${payload.name}さんの参加申請を取り消しました。`,
        })
      );
    }
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
