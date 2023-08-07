import { createSlice } from '@reduxjs/toolkit';

export const hostSlice = createSlice({

    name: 'host',
    
    initialState: {
        host: 'aleon88',
        errorHost: false
    },

    reducers: {
        setHost: (state , { payload }) => {
            state.host = payload.host;
        },
        setErrorHost: (state) => {
            state.errorHost = true;
        },
        resetHost: (state) => {
            state.host = 'aleon88';
        },
        clearErrorHost: (state) => {
            state.errorHost = false;
        }
    }

});

export const {
    setHost,
    setErrorHost,
    resetHost,
    clearErrorHost
} = hostSlice.actions;