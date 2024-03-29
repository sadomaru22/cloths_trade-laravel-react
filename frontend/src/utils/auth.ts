import store from 'store';
import { GUEST_EMAIL } from 'config/app';
import { fetchAuthUser } from 'store/thunks/auth';

/*
getStateでstoreのデータにアクセス(connect関数の代替)して
ログインしているかどうかなどの確認。
*/

export const isReady = () => store.getState().auth.signedIn !== undefined;

export const isSignedIn = () => store.getState().auth.signedIn;

export const isAfterRegistration = () =>
  store.getState().auth.afterRegistration;

export const isVerified = () => !!store.getState().auth.user?.emailVerifiedAt;

export const isGuest = () => store.getState().auth.user?.email === GUEST_EMAIL;

// store`signedIn`更新時に実行すること -> `useEffect`
export const initializeAuthState = () => {
  const localStorageKeys = {
    SIGNED_IN: 'SIGNED_IN',
  } as const;
  const localStorageValues = {
    TRUE: 'TRUE',
    FALSE: 'FALSE',
  } as const;
  const { SIGNED_IN } = localStorageKeys;
  const { TRUE, FALSE } = localStorageValues;

  // 初回 (session開始時) のみサーバーの認証状態を問い合わせ
  isSignedIn() === undefined && store.dispatch(fetchAuthUser());

  // (case null:) 更新した`store`の値で`localStorage`も更新
  const signedIn = isSignedIn() ? TRUE : FALSE;
  localStorage.setItem(SIGNED_IN, signedIn);

  // ブラウザでのログイン状態を示すが、サーバー側で認証切れの可能性あり
  // -> その確認は`apiClient.interceptors`で行う
};
