import axios, { AxiosError, AxiosResponse } from 'axios';

export interface HttpException extends AxiosError {
  response: AxiosResponse<{
    message: string;
  }>;
}

export const isHttpException = (payload: any): payload is HttpException =>
  axios.isAxiosError(payload)
//    &&
//   typeof payload.response?.data?.message === 'string';
  //typeof payload.response?.data?.message === 'string';
