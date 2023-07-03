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
        loadings: {
            token_loading: false,
            playlist_id_loading: false,
            track_id_loading: false,
            track_loading: false
        },
        isLoading: false,
    },

    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
            state.loadings.token_loading = true;
            state.loadings.playlist_id_loading = true;
            state.loadings.track_id_loading = true;
            state.loadings.track_loading = true;
        },
        setToken: (state, { payload }) => {
            state.token.token_type = undefined; // To force a state change so the first useEffect in 'HomePage' component will run correctly.
            state.token.access_token = undefined; // To force a state change so the first useEffect in 'HomePage' component will run correctly.
            state.token.token_type = payload.token_type;
            state.token.access_token = payload.access_token;
            state.loadings.token_loading = false;
        },
        setPlaylistID: (state, { payload }) => {
            state.playlist_id = payload.playlist_id;
            state.loadings.playlist_id_loading = false;
        },
        setTrackID: (state, { payload }) => {
            state.track_id = payload.track_id;
            state.loadings.track_id_loading = false;
        },
        setTrack: (state, { payload }) => {
            state.track.album = payload.album;
            state.track.image = payload.image;
            state.track.artist = payload.artist;
            state.track.name = payload.name;
            state.track.url = payload.url;
            state.loadings.track_loading = false;
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