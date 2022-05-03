import { createSlice } from '@reduxjs/toolkit';


/*
errorかnotFoundに飛ばす用のSlice
*/
type AppState = {
  notFound: boolean;
};

const initialState = {} as AppState;

export const appSlice = createSlice({
  name: 'app',   //これがActiontypeと同じ、あと以下は従来のReduxと変わらない
  initialState,
  reducers: {
    setError404(state) {
      state.notFound = true;
    },
    releaseError404(state) {
      state.notFound = initialState.notFound;
    },
  },
});

//redux Toolkitでは自動で同名のAction Creatorを作成する。Action Creatorを後ほど出てくるdispatchで指定するためAction Creatorをexportして他のコンポーネントからimportできるようにしておく。
export const { setError404, releaseError404 } = appSlice.actions;