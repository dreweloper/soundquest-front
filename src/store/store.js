import { configureStore } from '@reduxjs/toolkit';
import { errorSlice, hostSlice, likeSlice, loadingSlice, playlistSlice, tokenSlice, trackSlice } from './slices';

export const store = configureStore({

    reducer: {
        errors: errorSlice.reducer,
        host: hostSlice.reducer,
        like: likeSlice.reducer,
        loading: loadingSlice.reducer,
        playlist: playlistSlice.reducer,
        token: tokenSlice.reducer,
        track: trackSlice.reducer
    }

});