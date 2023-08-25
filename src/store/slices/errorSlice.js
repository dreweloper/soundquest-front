import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({

    name: 'errors',
    initialState: {
        error: true
    },
    reducers: {
        setError: (state) => {
            state.error = true;
        },
        clearError: (state) => {
            state.error = false
        }
    }

});

export const { setError, clearError } = errorSlice.actions;