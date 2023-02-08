import { configureStore } from '@reduxjs/toolkit';
import type { StateFromReducersMapObject } from '@reduxjs/toolkit';
import photoSlice from './slices/photoSlice';

const reducer = {
  photoSlice: photoSlice
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type StoreStateType = StateFromReducersMapObject<typeof reducer>;
export default store;
