import { configureStore } from '@reduxjs/toolkit';
import { tokenSlice } from './slices';

export const store = configureStore({

    reducer: {
        token: tokenSlice.reducer
    }

});