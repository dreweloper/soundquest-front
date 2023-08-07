import { createSlice } from '@reduxjs/toolkit';

export const hostSlice = createSlice({

    name: 'host',
    
    initialState: {
        host: 'aleon88',
        errorHost: false,
        errorMessage: undefined,
        isHostFormOpen: false
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
        resetHost: (state) => {
            state.host = 'aleon88';
        },
        clearErrorHost: (state) => {
            state.errorHost = false;
            state.errorMessage = undefined;
        },
        closeHostForm: (state) => {
            state.isHostFormOpen = false;
        }
    }

});

export const {
    setHost,
    setErrorHost,
    openHostForm,
    resetHost,
    clearErrorHost,
    closeHostForm
} = hostSlice.actions;