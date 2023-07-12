import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({

    name: 'playlist',

    initialState: {
        playlist_id: undefined,
        playlist_url: undefined
    },

    reducers: {
        setPlaylist: (state, { payload }) => {
            state.playlist_id = payload.playlist_id;
            state.playlist_url = payload.playlist_url;
        }
    }

});


export const { setPlaylist } = playlistSlice.actions;