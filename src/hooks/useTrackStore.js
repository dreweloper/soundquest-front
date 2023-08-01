import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { finishLoading, setError, setTrack, setTrackID } from "../store/slices";
import { mapTrackData, randomTrack } from "../helpers";

/**
 * Custom hook for 'trackSlice' to handle asynchronous functions.
 * @function useTrackStore
 * @returns {Function}
 */
export const useTrackStore = () => {

    // REDUX HOOKS
    const { token_type, access_token } = useSelector(state => state.token); // Destructuring of the properties 'token_type' and 'access_token' of 'token' state's object.

    const dispatch = useDispatch();


    /**
     * Get a playlist owned by a Spotify user.
     * @function getPlaylist
     * @async
     * @param {String} id The user's playlist ID.
     * @returns A random track ID.
     */
    const getPlaylist = async (id) => {

        /**
         * @type {String} Authorization fetch header that contains "token_type" (Bearer) and "access_token".
         */
        const authorization = `${token_type} ${access_token}`;

        /**
         * @type {String} Get playlist Spotify endpoint.
         */
        const url = `https://api.spotify.com/v1/playlists/${id}?offset=0&limit=50`;


        try {

            const response = await fetchSpotifyAPI(url, 'GET', authorization);

            if (response.ok) {

                /**
                 * @type {Object} Spotify Web API's response (Promise fulfilled).
                 */
                const { tracks } = response.data; // Destructuring of the property 'tracks' of 'response.data' object.

                /**
                 * @type {String} A random track ID.
                 */
                const track_id = randomTrack(tracks.items); // 'tracks.items' is an Array of Objects with the playlist's tracks information.

                dispatch(setTrackID({ track_id }));

            } else {

                dispatch(setError());

                dispatch(finishLoading());

                throw response;

            };

        } catch (error) {

            console.log(error);

        };

    };

    /**
     * Retrieve track information from Spotify API and dispatch it to the Redux store.
     * @function getTrack
     * @async
     * @param {String} id - The ID of the track to retrieve from Spotify API.
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

                // Dispatch the track data to the Redux store
                dispatch(setTrack({ album, artwork, artist, name, track_url }));

            } else {

                // Handle error when API request fails
                dispatch(setError());

                throw response;

            };

        } catch (error) {

            console.log(error);

        } finally {

            // Ensure the loading effect lasts longer.
            setTimeout(() => {

                dispatch(finishLoading());

            }, 1500);

        };

    };


    return { getPlaylist, getTrack };

};