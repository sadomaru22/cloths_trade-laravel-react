import store from "store";

/*
getStateでstoreのデータにアクセス(connect関数の代替)して
ログインしているかどうかの確認。
*/

export const isSignedIn = () => store.getState().auth.signedIn;