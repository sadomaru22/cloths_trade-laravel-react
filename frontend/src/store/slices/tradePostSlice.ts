import { createSlice } from '@reduxjs/toolkit';


type AppState = {
   notFound: boolean;
 };
 
 const initialState = {} as AppState;

 export const tradePostSlice = createSlice({
   name: 'app',   //これがActiontypeと同じ、あと以下は従来のReduxと変わらない
   initialState,
   reducers: {
     setError2404(state) {
       state.notFound = true;
     },
     releaseError2404(state) {
       state.notFound = initialState.notFound;
     },
   },
 });

 export const { setError2404, releaseError2404 } = tradePostSlice.actions;