import { createSlice } from '@reduxjs/toolkit';

export const trackSlice = createSlice({

    name: 'track',
    initialState: {
        track: {
            track_id: undefined,
            album: undefined,
            artwork: undefined,
            artist: undefined,
            name: undefined,
            track_url: undefined,
        },
        isTrackIdDone: false,
        isTrackDone: false
    },
    reducers: {
        setTrackId: (state, { payload }) => {
            state.track.track_id = payload;
            state.isTrackIdDone = true;
        },
        setTrackIdDone: (state) => {
            state.isTrackIdDone = true;
        },
        setTrackIdUndone: (state) => {
            state.isTrackIdDone = false;
        },
        setTrack: (state, { payload }) => {
            state.track.album = payload.album;
            state.track.artwork = payload.artwork;
            state.track.artist = payload.artist;
            state.track.name = payload.name;
            state.track.track_url = payload.track_url;
            state.isTrackDone = true;
        }
    }

});


export const {
    setTrackId,
    setTrackIdDone,
    setTrackIdUndone,
    setTrack,
} = trackSlice.actions;