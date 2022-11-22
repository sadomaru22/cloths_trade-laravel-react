import { createAsyncThunk } from '@reduxjs/toolkit';

import { UPDATE_USER_INFO_PATH } from 'config/api';
import { apiClient } from 'utils/api';
import { AsyncThunkConfig } from 'store/thunks/config';
import { makeRejectValue } from 'store/thunks/utils';

export type UpdateProfileResponse = {
  name: string;
  email: string;
  icon: string;
  jikoshokai: string;
};

export type UpdateProfileRequest = {
  name: string;
  email: string;
  icon: string;
  jikoshokai: string;
};

export const updateProfile = createAsyncThunk<
  UpdateProfileResponse,
  UpdateProfileRequest,
  AsyncThunkConfig
>('auth/updateProfile', async (payload, thunkApi) => {
  const { name, email, icon, jikoshokai } = payload;
  console.log(icon);
  try {
    await apiClient().put(UPDATE_USER_INFO_PATH, {
      name,
      email,
      icon,
      jikoshokai,
    });
    return { name, email, icon, jikoshokai }; // fulfill時は、requestの値をそのまま`return`
  } catch (error) {
    return thunkApi.rejectWithValue(makeRejectValue(error));
  }
});
