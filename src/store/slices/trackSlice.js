import { createSlice } from '@reduxjs/toolkit';

export const trackSlice = createSlice({

    name: 'track',

    initialState: {
        track_id: undefined,
        album: undefined,
        artwork: undefined,
        artist: undefined,
        name: undefined,
        track_url: undefined
    },

    reducers: {
        setTrackID: (state, { payload }) => {
            state.track_id = payload.track_id;
        },
        setTrack: (state, { payload }) => {
            state.album = payload.album;
            state.artwork = payload.artwork;
            state.artist = payload.artist;
            state.name = payload.name;
            state.track_url = payload.track_url;
        },
        clearTrack: (state) => {
            state.track_id = undefined;
            state.album = undefined;
            state.artwork = undefined;
            state.artist = undefined;
            state.name = undefined;
            state.track_url = undefined;
        }
    }

});


export const { setTrackID, setTrack, clearTrack } = trackSlice.actions;