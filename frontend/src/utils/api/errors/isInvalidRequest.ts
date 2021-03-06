import axios, { AxiosError, AxiosResponse } from 'axios';

/*
makeErrorMessageFrom.tsとセット。
*/

export interface InvalidRequest extends AxiosError {
  response: AxiosResponse<{
    message: string;
    errors: { [source: string]: string[] };
  }>;
}

export const isInvalidRequest = (payload: any): payload is InvalidRequest =>
  axios.isAxiosError(payload) &&
  payload.response?.status === 422 
//   &&
//   typeof payload.response?.data?.errors === 'object';