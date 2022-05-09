import store from "store";
import { GUEST_EMAIL } from 'config/app';

/*
getStateでstoreのデータにアクセス(connect関数の代替)して
ログインしているかどうかなどの確認。
*/

export const isSignedIn = () => store.getState().auth.signedIn;

export const isAfterRegistration = () =>
  store.getState().auth.afterRegistration;

export const isVerified = () => !!store.getState().auth.user?.emailVerifiedAt;  

export const isGuest = () => store.getState().auth.user?.email === GUEST_EMAIL;