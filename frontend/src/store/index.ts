import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { appSlice, authSlice, tradePostSlice } from './slices';

//コードの重複を避けるためにこの形にする。名前の通りcombineする
export const combinedReducer = combineReducers({
   // ここにslicesで作成したreducerを追加する
   app: appSlice.reducer,
   auth: authSlice.reducer,
   tradePost: tradePostSlice.reducer,
 });

//これらによって、すぐに何か効果を実感するものではないが、必要になったときにAppDispatchをimportするのを忘れることを防ぐことができる。
// useSelector(useAppSelector.ts)で使う。とりあえず型定義を公式ドキュメントに沿って設定。 
 export type RootState = ReturnType<typeof combinedReducer>;

export const rootReducer = (
  state: RootState | undefined,
  action: AnyAction
) => {
  const actionsWithReset = [
    'auth/signOut',          //なんでこの3つ？
    'auth/signOutFromAPI/fulfilled',
    'auth/deleteAccount/fulfilled',
  ];

  if (actionsWithReset.includes(action.type)) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,    //これで全てのコンポーネントから、各Sliceで設定したstateにアクセスできるようになる
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /**
       *  If your state or actions are very large,
       *  the SerializableStateInvariantMiddleware,
       *  that causes a slowdown in dev, can be disabled
       */
      serializableCheck: false,
    }),
  devTools: true,   //追加  
});

//とりあえず型定義を公式ドキュメントに沿って設定。 
export type AppDispatch = typeof store.dispatch;

export default store;
