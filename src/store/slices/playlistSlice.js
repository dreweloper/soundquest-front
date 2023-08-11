import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({

    name: 'playlist',

    initialState: {
        playlist_id: undefined,
        playlist_url: undefined
    },

    reducers: {
        setPlaylist: (state, { payload }) => {
            state.playlist_id = payload.randomPlaylistID;
            state.playlist_url = payload.playlistUrl;
        },
        clearPlaylist: (state) => {
            state.playlist_id = undefined;
            state.playlist_url = undefined;
        }
    }

});


export const { setPlaylist, clearPlaylist } = playlistSlice.actions;