import { createSlice } from '@reduxjs/toolkit';

export const hostSlice = createSlice({

    name: 'host',
    initialState: {
        host: {
            username: 'aleon88',
            profile_url: 'https://open.spotify.com/user/aleon88'
        },
        isHostFormOpen: false,
        isHostLoading: false,
        isHostUpdated: false,
        errorHost: false,
        errorMessage: undefined,
    },
    reducers: {
        setHost: (state , { payload }) => {
            state.host.username = payload.uid;
            state.host.profile_url = payload.profileUrl
            state.isHostUpdated = true;
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
            state.isHostUpdated = false;
        },
        clearErrorHost: (state) => {
            state.errorHost = false;
            state.errorMessage = undefined;
        },
        closeHostForm: (state) => {
            state.isHostFormOpen = false;
            state.isHostUpdated = false;
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