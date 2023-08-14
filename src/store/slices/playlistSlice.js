import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({

    name: 'playlist',
    initialState: {
        playlist: {
            playlist_id: undefined,
            playlist_url: undefined
        },
        isPlaylistDone: false
    },
    reducers: {
        setPlaylist: (state, { payload }) => {
            state.playlist.playlist_id = payload.randomPlaylistID;
            state.playlist.playlist_url = payload.PlaylistUrl;
            state.isPlaylistDone = true;
        },
        setPlaylistDone: (state) => {
            state.isPlaylistDone = true;
        },
        setPlaylistUndone: (state) => {
            state.isPlaylistDone = false;
        }
    }

});


export const {
    setPlaylist,
    setPlaylistDone,
    setPlaylistUndone
} = playlistSlice.actions;