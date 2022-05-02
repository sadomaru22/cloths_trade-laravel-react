import store from "store";

/*
getStateでstoreのデータにアクセス(connect関数の代替)
*/

export const isSignedIn = () => store.getState().auth.signedIn;