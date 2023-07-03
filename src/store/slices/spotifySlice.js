import { createSlice } from '@reduxjs/toolkit';

export const spotifySlice = createSlice({

    name: 'spotify',

    initialState: {
        token: {
            token_type: undefined,
            access_token: undefined
        },
        playlist_id: undefined,
        track_id: undefined,
        track: {
            album: undefined,
            image: undefined,
            artist: undefined,
            name: undefined,
            url: undefined
        },
        isLoading: false,
    },

    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        setToken: (state, { payload }) => {
            state.token.token_type = undefined;
            state.token.access_token = undefined;
            state.token.token_type = payload.token_type;
            state.token.access_token = payload.access_token;
        },
        setPlaylistID: (state, { payload }) => {
            state.playlist_id = payload.playlist_id;
        },
        setTrackID: (state, { payload }) => {
            state.track_id = payload.track_id;
        },
        setTrack: (state, { payload }) => {
            state.track.album = payload.album;
            state.track.image = payload.image;
            state.track.artist = payload.artist;
            state.track.name = payload.name;
            state.track.url = payload.url;
            state.isLoading = false;
        },
    }

});

export const {
    startLoading,
    setToken,
    setPlaylistID,
    setTrackID,
    setTrack
} = spotifySlice.actions;