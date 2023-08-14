import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({

    name: 'token',
    initialState: {
        token: {},
        isTokenDone: false
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload;
            state.isTokenDone = true;
        },
        setTokenDone: (state) => {
            state.isTokenDone = true;
        },
        clearToken: (state) => {
            state.token = {};
        },
        setTokenUndone: (state) => {
            state.isTokenDone = false;
        }
    }

});


export const {
    setToken,
    setTokenDone,
    clearToken,
    setTokenUndone
} = tokenSlice.actions;