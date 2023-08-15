import { createSlice } from '@reduxjs/toolkit';
/**
 * Redux slice for managing track-related state.
 *
 * @typedef {Object} TrackState - The state object managed by this slice.
 * @property {Object} track - The track information.
 * @property {String|Undefined} track_id - The ID of the track.
 * @property {String|Undefined} album - The album of the track.
 * @property {String|Undefined} artwork - The artwork of the track.
 * @property {String|Undefined} artist - The artist of the track.
 * @property {String|Undefined} name - The name of the track.
 * @property {String|Undefined} track_url - The URL of the track.
 * @property {Boolean} isTrackIdDone - Indicates whether the track ID operation is done.
 *
 * @typedef {Object} TrackIdPayload - The payload object for setTrackId action.
 * @property {String} trackId - The ID of the track.
 *
 * @typedef {Object} TrackPayload - The payload object for setTrack action.
 * @property {String|Undefined} album - The album of the track.
 * @property {String|Undefined} artwork - The artwork of the track.
 * @property {String|Undefined} artist - The artist of the track.
 * @property {String|Undefined} name - The name of the track.
 * @property {String|Undefined} track_url - The URL of the track.
 */
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
    },
    reducers: {
        /**
         * Set the track ID and mark the track ID operation as done.
         *
         * @function
         * @param {TrackState} state - The current state.
         * @param {TrackIdPayload} action - The action containing the track ID payload.
         */
        setTrackId: (state, { payload }) => {
            state.track.track_id = payload;
            state.isTrackIdDone = true;
        },
        /**
         * Mark the track ID operation as done.
         *
         * @function
         * @param {TrackState} state - The current state.
         */
        setTrackIdDone: (state) => {
            state.isTrackIdDone = true;
        },
        /**
         * Mark the track ID operation as not done.
         *
         * @function
         * @param {TrackState} state - The current state.
         */
        setTrackIdUndone: (state) => {
            state.isTrackIdDone = false;
        },
        /**
         * Set track information.
         *
         * @function
         * @param {TrackState} state - The current state.
         * @param {TrackPayload} action - The action containing the track payload.
         */
        setTrack: (state, { payload }) => {
            state.track.album = payload.album;
            state.track.artwork = payload.artwork;
            state.track.artist = payload.artist;
            state.track.name = payload.name;
            state.track.track_url = payload.track_url;
        }
    }

});

/**
 * Action creators for the track slice.
 *
 * @type {Object}
 * @property {function(TrackIdPayload): { type: String, payload: TrackIdPayload }} setTrackId - Set the track ID and mark the track ID operation as done.
 * @property {function(): { type: String }} setTrackIdDone - Mark the track ID operation as done.
 * @property {function(): { type: String }} setTrackIdUndone - Mark the track ID operation as not done.
 * @property {function(TrackPayload): { type: String, payload: TrackPayload }} setTrack - Set track information.
 */
export const {
    setTrackId,
    setTrackIdDone,
    setTrackIdUndone,
    setTrack,
} = trackSlice.actions;