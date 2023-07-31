import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({

    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        finishLoading: (state) => {
            state.isLoading = false
        }
    }

});


export const { startLoading, finishLoading } = loadingSlice.actions;