import { ImagesResponseData } from '@/interfaces/gallery';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';

const initialState = {
  photos: [] as ImagesResponseData[],
  favoritedPhotos: [] as ImagesResponseData[]
};

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    resetSlice: () => initialState,

    setPhotos: (state, action: PayloadAction<ImagesResponseData[]>) => produce(
      state,
      (draftState) => ({
        ...draftState,
        photos: action.payload,
      }),
    ),

    setFavoritedPhotos: (state, action: PayloadAction<ImagesResponseData[]>) => produce(
      state,
      (draftState) => ({
        ...draftState,
        favoritedPhotos: action.payload,
      }),
    ),
  },
});

export const {
  resetSlice,
  setPhotos,
  setFavoritedPhotos
} = photoSlice.actions;
export type photoSliceType = typeof photoSlice;
export default photoSlice.reducer;
