import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';

export type SankaSinseiResponse = {
  success: boolean;
  url: string;
};

export type SankaSinseiRequest = {
  trade_post_id: string;
  id: string | null;
};

export const sankaSinsei = createAsyncThunk<
  SankaSinseiResponse,
  SankaSinseiRequest,
  AsyncThunkConfig
>('tradePost/sankaSinsei', async (payload, thunkApi) => {
  console.log(payload);
  const path = '/sinsei/sanka';

  try {
    const response = await apiClient().post(path, payload); //TradePost2Controller@sankaSinsei
    const { setFlash } = await import('store/slices/authSlice');
    if (response?.data) {
      thunkApi.dispatch(
        setFlash({
          type: 'success',
          message: '参加申請を送りました。',
        })
      );
    }
    return response?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
