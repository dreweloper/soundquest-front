import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({

    name: 'token',
    initialState: {
        access_token: undefined,
        token_type: undefined
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.access_token = payload.access_token;
            state.token_type = payload.token_type;
        }
    }
});

export const { setToken } = tokenSlice.actions;