import { configureStore } from '@reduxjs/toolkit';
import { playlistSlice, spotifySlice, tokenSlice, trackSlice } from './slices';

export const store = configureStore({

    reducer: {
        spotify: spotifySlice.reducer,

        token: tokenSlice.reducer,
        playlist: playlistSlice.reducer,
        track: trackSlice.reducer
    }

});