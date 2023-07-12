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
            state.loading_token = false
        },
        clearToken: (state) => {
            state.token_type = undefined; // To force a state change so the first useEffect in 'HomePage' component will run correctly.
            state.access_token = undefined; // To force a state change so the first useEffect in 'HomePage' component will run correctly.
        }
    }

});


export const { setToken, clearToken } = tokenSlice.actions;