import { createSlice } from '@reduxjs/toolkit';

export const spotifySlice = createSlice({

    name: 'spotify',

    initialState: {
        token: {
            token_type: undefined,
            access_token: undefined
        },
        playlist: {
            playlist_id: undefined,
            playlist_url: undefined
        },
        track: {
            track_id: undefined,
            album: undefined,
            artwork: undefined,
            artist: undefined,
            name: undefined,
            track_url: undefined
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
        setTokenB: (state, { payload }) => {
            state.token.token_type = undefined; // To force a state change so the first useEffect in 'HomePage' component will run correctly.
            state.token.access_token = undefined; // To force a state change so the first useEffect in 'HomePage' component will run correctly.
            state.token.token_type = payload.token_type;
            state.token.access_token = payload.access_token;
            state.loadings.token_loading = false;
        },
        setPlaylistID: (state, { payload }) => {
            state.playlist.playlist_id = payload.playlist_id;
            state.playlist.playlist_url = payload.playlist_url;
            state.loadings.playlist_id_loading = false;
        },
        setTrackID: (state, { payload }) => {
            state.track.track_id = payload.track_id;
            state.loadings.track_id_loading = false;
        },
        setTrack: (state, { payload }) => {
            state.track.album = payload.album;
            state.track.artwork = payload.artwork;
            state.track.artist = payload.artist;
            state.track.name = payload.name;
            state.track.track_url = payload.track_url;
            state.loadings.track_loading = false;
            state.isLoading = false;
        },
    }

});

export const {
    startLoading,
    setTokenB,
    setPlaylistID,
    setTrackID,
    setTrack
} = spotifySlice.actions;