import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';

//SankaJuri.tsxの「却下」ボタン押下時
export type DelsanSinseiResponse = {
  success: boolean;
};

export type DelsanSinseiRequest = {
  trade_post_id: string;
  user_id: string | null;
};

export const delsanSinsei = createAsyncThunk<
  DelsanSinseiResponse,
  DelsanSinseiRequest,
  AsyncThunkConfig
>('tradePost/delsanSinsei', async (payload, thunkApi) => {
  console.log(payload);
  const path = '/sinsei/delsan';

  try {
    const response = await apiClient().post(path, payload); //SinseiController@delsanSinsei
    const { setFlash } = await import('store/slices/authSlice');
    if (response?.data) {
      thunkApi.dispatch(
        setFlash({
          type: 'success',
          message: `参加申請を取り消しました。`,
        })
      );
    }
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
