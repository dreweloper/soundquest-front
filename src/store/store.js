import { configureStore } from '@reduxjs/toolkit';
import { spotifySlice } from './slices';

export const store = configureStore({

    reducer: {
        spotify: spotifySlice.reducer
    }

});