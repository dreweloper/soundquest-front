import { createSlice } from '@reduxjs/toolkit';
/**
 * Redux slice for managing playlist-related state.
 *
 * @typedef {Object} PlaylistState - The state object managed by this slice.
 * @property {Object} playlist - The playlist information.
 * @property {String|Undefined} playlist_id - The ID of the playlist.
 * @property {String|Undefined} playlist_url - The URL of the playlist.
 * @property {Boolean} isPlaylistDone - Indicates whether the playlist operation is done.
 *
 * @typedef {Object} PlaylistPayload - The payload object for setPlaylist action.
 * @property {String} randomPlaylistID - The randomly selected playlist ID.
 * @property {String} PlaylistUrl - The URL of the Spotify playlist.
 */
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
        /**
         * Set the playlist information and mark the playlist operation as done.
         *
         * @function
         * @param {PlaylistState} state - The current state.
         * @param {PlaylistPayload} action - The action containing the playlist payload.
         */
        setPlaylist: (state, { payload }) => {
            state.playlist.playlist_id = payload.randomPlaylistID;
            state.playlist.playlist_url = payload.PlaylistUrl;
            state.isPlaylistDone = true;
        },
        /**
         * Mark the playlist operation as done.
         *
         * @function
         * @param {PlaylistState} state - The current state.
         */
        setPlaylistDone: (state) => {
            state.isPlaylistDone = true;
        },
        /**
         * Mark the playlist operation as not done.
         *
         * @function
         * @param {PlaylistState} state - The current state.
         */
        setPlaylistUndone: (state) => {
            state.isPlaylistDone = false;
        }
    }

});

/**
 * Action creators for the playlist slice.
 *
 * @type {Object}
 * @property {function(PlaylistPayload): { type: String, payload: PlaylistPayload }} setPlaylist - Set the playlist information and mark the playlist operation as done.
 * @property {function(): { type: String }} setPlaylistDone - Mark the playlist operation as done.
 * @property {function(): { type: String }} setPlaylistUndone - Mark the playlist operation as not done.
 */
export const {
    setPlaylist,
    setPlaylistDone,
    setPlaylistUndone
} = playlistSlice.actions;