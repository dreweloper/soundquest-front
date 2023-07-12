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
            state.track_id = payload.track_id
        },
        setTrack: (state, { payload }) => {
            state.album = payload.album;
            state.artwork = payload.artwork;
            state.artist = payload.artist;
            state.name = payload.name;
            state.track_url = payload.track_url;
        }
    }

});


export const { setTrackID, setTrack } = trackSlice.actions;