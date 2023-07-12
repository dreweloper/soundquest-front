import { configureStore } from '@reduxjs/toolkit';
import { loadingSlice, playlistSlice, tokenSlice, trackSlice } from './slices';

export const store = configureStore({

    reducer: {
        token: tokenSlice.reducer,
        playlist: playlistSlice.reducer,
        track: trackSlice.reducer,
        loading: loadingSlice.reducer
    }

});