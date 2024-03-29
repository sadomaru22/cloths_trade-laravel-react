import axios from 'axios';
import { API_HOST, API_ROUTE } from 'config/api';
import { DocumentBase } from 'models';
import { setError404 } from 'store/slices/appSlice';

/*
非同期処理の大元。API処理の頭の部分の設定。
*/

/**
 * Laravelからデータの配列と共にページネーションに関する情報及びリンクをリクエストする際のレスポンスタイプ
 *
 * @property {Object[]} data 受け取るデータ本体の配列
 * @param {Object} links 隣り合うページ及び端のページのリンク
 * @param {Object} meta 現在のページやデータ総数などの情報
 * @see https://laravel.com/docs/8.x/eloquent-resources#pagination
 */
export type ResponseWithPagination<T extends DocumentBase> = {
  data: T[];
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta: {
    current_page: number;
    last_page: number;
    from: number; // 表示中`data`の最初のインデックス
    to: number; // 表示中`data`の最後のインデックス
    total: number; // `data`総数
    per_page: number; // 一度に表示するデータ数
    path: string; // クエリ`?page=`を除いたURL
    links: {
      url: string; // 各ページへのURL ([0]は前ページ, [-1]は次ページ)
      label: string; // ページ表示用に利用できる文字 (例: "Next &raquo;")
      active: boolean; // 現在のページのみ`true`
    }[];
  };
};

type ApiClientOption = {
  apiRoute?: boolean;
  intercepted?: boolean;
};

export const apiClient = (options?: ApiClientOption) => {
  /** @returns `true` even if the param is `undefined` (default) */
  const isNonApiRoute = () => options?.apiRoute === false;
  const isNotIntercepted = () => options?.intercepted === false;

  const apiClient = axios.create({
    baseURL: isNonApiRoute() ? API_HOST : API_ROUTE, //可変にする
    withCredentials: true, //これによってSanctumのCORSに対応する。
  });

  if (isNotIntercepted()) return apiClient;

  //responseのケースごとにFlashメッセージを挟む処理。
  apiClient.interceptors.response.use(
    (response) => response, // response = 2xx の場合は素通り
    async (error) => {
      const { default: store } =
        //   process.env.NODE_ENV === 'test'   //testモードだった時
        //     ? await import('mocks/store')
        //     :
        await import('store');
      const { setFlash, signOut } = await import('store/slices/authSlice');

      if (!axios.isAxiosError(error)) return Promise.reject(error);

      switch (error.response?.status || 500) {
        case 401:
        case 419:
          store.dispatch(signOut()); // ->initializeAuthState()
          store.dispatch(
            setFlash({ type: 'error', message: 'ログインしてください' })
          );
          return Promise.reject(error);
        case 403:
          store.dispatch(
            setFlash({ type: 'error', message: '不正なリクエストです' })
          );
          return Promise.reject(error);
        case 404:
          store.dispatch(setError404());
          return Promise.reject(error);
        case 500:
          store.dispatch(
            setFlash({ type: 'error', message: 'システムエラーが発生しました' })
          );
          return Promise.reject(error);
        default:
          return Promise.reject(error); // `return`欠落 -> "response undefined"
      }
    }
  );

  return apiClient;
};
