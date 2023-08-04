import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { finishLoading, setError, setTrack, setTrackID } from "../store/slices";
import { mapTrackData, shuffleArray } from "../helpers";

/**
 * Custom hook for 'trackSlice' to handle asynchronous functions.
 * 
 * @function useTrackStore
 * @returns {Object} An object containing the following functions:
 * - getPlaylist: Retrieve playlist information owned by a user from Spotify API.
 * - Retrieve track information from Spotify API and dispatch it to the Redux store.
 */
export const useTrackStore = () => {

    // REDUX HOOKS
    /**
     * The 'token' state object from Redux store.
     * @type {Object}
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token_type, access_token } = useSelector(state => state.token); // Destructuring of the properties 'token_type' and 'access_token' of 'token' state's object.
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();


    /**
     * Retrieve playlist information owned by a user from Spotify API.
     * 
     * @function getPlaylist
     * @async
     * @param {String} id The ID of the playlist to retrieve from Spotify API.
     * @returns {void}
     * @throws {Error} If there is an error during the API request or if the response status is not OK.
     */
    const getPlaylist = async (id) => {

        /**
         * The Authorization header that contains "token_type" (Bearer) and "access_token".
         * @type {String}
         */
        const authorization = `${token_type} ${access_token}`;

        /**
         * The endpoint URL to retrieve the playlist from Spotify API.
         * @type {String}
         */
        const url = `https://api.spotify.com/v1/playlists/${id}?offset=0&limit=50`;

        try {
            /**
             * The response received from Spotify API.
             * @type {Object}
             */
            const response = await fetchSpotifyAPI(url, 'GET', authorization);

            if (response.ok) {
                /**
                 * Information about the playlist's tracks.
                 * @type {Array<Object>}
                 */
                const { items } = response.data.tracks;

                // This error occurs when the provided ID corresponds to an empty playlist.
                if (items.length == 0) {

                    dispatch(setError());

                    // Ensure the loading effect lasts longer.
                    setTimeout(() => {

                        dispatch(finishLoading());

                    }, 1500);

                } else {
                    /**
                     * Track IDs extracted from the playlist's tracks information.
                     * @type {Array<String>}
                     */
                    const arrTracksID = items.map(item => item.track.id);
                    /**
                     * A random track ID.
                     * @type {String}
                     */
                    const track_id = shuffleArray(arrTracksID);

                    dispatch(setTrackID({ track_id }));

                };

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());

            // Ensure the loading effect lasts longer.
            setTimeout(() => {

                dispatch(finishLoading());

            }, 1500);

        };

    }; //!GETPLAYLIST

    /**
     * Retrieve track information from Spotify API and dispatch it to the Redux store.
     * 
     * @function getTrack
     * @async
     * @param {String} id - The ID of the track to retrieve from Spotify API.
     * @returns {void}
     * @throws {Error} If there is an error during the API request or if the response status is not OK.
     */
    const getTrack = async (id) => {

        /**
         * The Authorization header that contains "token_type" (Bearer) and "access_token".
         * @type {String}
         */
        const authorization = `${token_type} ${access_token}`;

        /**
         * The endpoint URL to retrieve the track from Spotify API.
         * @type {String}
         */
        const url = `https://api.spotify.com/v1/tracks/${id}`;


        try {

            /**
             * The API response received from Spotify API.
             * @type {Object}
             */
            const response = await fetchSpotifyAPI(url, 'GET', authorization);

            if (response.ok) {

                /**
                 * The track data received from Spotify API.
                 * @type {Object}
                 * @property {String} album The album on which the track appears.
                 * @property {String} artwork The cover art for the album.
                 * @property {String} artist The artists who performed the track.
                 * @property {String} name The name of the track.
                 * @property {String} track_url The Spotify URL for this track.
                 */
                const { album, artwork, artist, name, track_url } = mapTrackData('spotify', response.data);

                dispatch(setTrack({ album, artwork, artist, name, track_url }));

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());

        } finally {

            // Ensure the loading effect lasts longer.
            setTimeout(() => {

                dispatch(finishLoading());

            }, 1500);

        };

    }; //!GETTRACK


    return { getPlaylist, getTrack };

};