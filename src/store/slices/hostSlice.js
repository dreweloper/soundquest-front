import { createSlice } from '@reduxjs/toolkit';

export const hostSlice = createSlice({

    name: 'host',
    
    initialState: {
        host: 'aleon88',
        errorHost: false,
        errorMessage: undefined,
        isHostFormOpen: false,
        isHostLoading: false,
    },

    reducers: {
        setHost: (state , { payload }) => {
            state.host = payload;
        },
        setErrorHost: (state, { payload }) => {
            state.errorHost = true;
            state.errorMessage = payload;
        },
        openHostForm: (state) => {
            state.isHostFormOpen = true;
        },
        startHostLoading: (state) => {
            state.isHostLoading = true;
        },
        resetHost: (state) => {
            state.host = 'aleon88';
        },
        clearErrorHost: (state) => {
            state.errorHost = false;
            state.errorMessage = undefined;
        },
        closeHostForm: (state) => {
            state.isHostFormOpen = false;
        },
        finishHostLoading: (state) => {
            state.isHostLoading = false;
        }
    }

});

export const {
    setHost,
    setErrorHost,
    openHostForm,
    startHostLoading,
    resetHost,
    clearErrorHost,
    closeHostForm,
    finishHostLoading
} = hostSlice.actions;