import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({

    name: 'token',

    initialState: {
        token_type: undefined,
        access_token: undefined,
    },

    reducers: {
        setToken: (state, { payload }) => {
            state.token_type = payload.token_type;
            state.access_token = payload.access_token;
        },
        clearToken: (state) => {
            state.token_type = undefined;
            state.access_token = undefined;
        }
    }

});


export const { setToken, clearToken } = tokenSlice.actions;