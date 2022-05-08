import store from "store";

/*
getStateでstoreのデータにアクセス(connect関数の代替)して
ログインしているかどうかなどの確認。
*/

export const isSignedIn = () => store.getState().auth.signedIn;

export const isAfterRegistration = () =>
  store.getState().auth.afterRegistration;

export const isVerified = () => !!store.getState().auth.user?.emailVerifiedAt;  