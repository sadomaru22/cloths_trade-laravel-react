import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appSlice, authSlice } from './slices';

//コードの重複を避けるためにこの形にする。名前の通りcombineする
export const rootReducer = combineReducers({
   // ここにslicesで作成したreducerを追加する
   app: appSlice.reducer,
   auth: authSlice.reducer,
 });
 
 const store = configureStore({ reducer: rootReducer });

//これらによって、すぐに何か効果を実感するものではないが、必要になったときにAppDispatchをimportするのを忘れることを防ぐことができる。
// useSelector(useAppSelector.ts)で使う。とりあえず型定義を公式ドキュメントに沿って設定。 
 export type RootState = ReturnType<typeof rootReducer>;

//とりあえず型定義を公式ドキュメントに沿って設定。  
 export type AppDispatch = typeof store.dispatch;
 
 export default store;