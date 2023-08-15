import { createSlice } from '@reduxjs/toolkit';
/**
 * Redux slice for managing token-related state.
 *
 * @typedef {Object} TokenState - The state object managed by this slice.
 * @property {Object} token - The token data.
 * @property {Boolean} isTokenDone - Indicates whether the token operation is done.
 *
 * @typedef {Object} TokenPayload - The payload object for setToken action.
 * @property {Object} token - The token data to set.
 */
export const tokenSlice = createSlice({

    name: 'token',
    initialState: {
        token: {},
        isTokenDone: false
    },
    reducers: {
        /**
         * Set the token and mark the token operation as done.
         *
         * @function
         * @param {TokenState} state - The current state.
         * @param {TokenPayload} action - The action containing the token payload.
         */
        setToken: (state, { payload }) => {
            state.token = payload;
            state.isTokenDone = true;
        },
        /**
         * Mark the token operation as done.
         *
         * @function
         * @param {TokenState} state - The current state.
         */
        setTokenDone: (state) => {
            state.isTokenDone = true;
        },
        /**
         * Clear the token data.
         *
         * @function
         * @param {TokenState} state - The current state.
         */
        clearToken: (state) => {
            state.token = {};
        },
        /**
         * Mark the token operation as not done.
         *
         * @function
         * @param {TokenState} state - The current state.
         */
        setTokenUndone: (state) => {
            state.isTokenDone = false;
        }
    }

});

/**
 * Action creators for the token slice.
 *
 * @type {Object}
 * @property {function(TokenPayload): { type: String, payload: TokenPayload }} setToken - Set the token and mark the token operation as done.
 * @property {function(): { type: String }} setTokenDone - Mark the token operation as done.
 * @property {function(): { type: String }} clearToken - Clear the token data.
 * @property {function(): { type: String }} setTokenUndone - Mark the token operation as not done.
 */
export const {
    setToken,
    setTokenDone,
    clearToken,
    setTokenUndone
} = tokenSlice.actions;