import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { dispatchWithDelay, mapTrackData, resetStateFlags, shuffleArray } from "../helpers";
import { finishLoading, setError, setPlaylistUndone, setTokenUndone, setTrack, setTrackId, setTrackIdDone, setTrackIdUndone } from "../store/slices";

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
    const { token: { token_type, access_token }} = useSelector(state => state.token);
    /**
     * The 'track' state object from Redux store.
     * @type {Object}
     * @property {String} track_id - A randomly selected track ID.
     * @property {Boolean} isTrackIdDone - It signifies the completion of processing for the state property 'track_id'.
     */
    const { track: { track_id }} = useSelector(state => state.track);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // VARIABLES
    /**
     * The Authorization header that contains "token_type" (Bearer) and "access_token".
     * @type {String}
     */
    const authorization = `${token_type} ${access_token}`;
    /**
     * The URL base of the Spotify Web API.
     * @type {String}
     */
    const urlBase = 'https://api.spotify.com';

    //FUNCTIONS
    /**
     * Retrieves information about a playlist owned or followed by a user from the Spotify API.
     * 
     * @function getPlaylist
     * @async
     * @param {String} id - The ID of the playlist to retrieve from the Spotify API.
     * @returns {void}
     * @throws {Error} Throws an error if an issue occurs during the token request process.
     */
    const getPlaylist = async (id) => {

        try {
            /**
             * The API response received from Spotify API.
             * @type {Object}
             * @property {Boolean} ok - Indicates if the response is successful.
             * @property {Object} data - Information about a playlist owned by a Spotify user.
             */
            const response = await fetchSpotifyAPI(`${urlBase}/v1/playlists/${id}?offset=0&limit=50`, 'GET', authorization);

            if (response.ok) {
                /**
                 * Information about the playlist's tracks.
                 * @type {Array<Object>}
                 */
                const { items } = response.data.tracks;

                // Handles the case when the playlist is empty.
                if (items.length == 0) {

                    dispatch(setError());
                    // Ensures the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishLoading(), 1500);

                } else {
                    /**
                     * Array of track IDs extracted from the playlist.
                     * @type {Array<String>}
                     */
                    const arrTrackIDs = items.map(item => item.track.id);
                    /**
                     * A randomly selected track ID.
                     * @type {String}
                     */
                    const randomTrackID = shuffleArray(arrTrackIDs);

                    // If the new track is the same as the current.
                    if (randomTrackID == track_id) {

                        dispatch(setTrackIdDone());

                    } else {

                        dispatch(setTrackId(randomTrackID));

                    };
                };
            };

        } catch (error) {

            console.log(error);

            dispatch(setError());
            // Ensures consistent state updates for 'useEffect' in DiscoverPage and prevents unnecessary re-rendering when navigating with arrows.
            resetStateFlags(dispatch, [setTokenUndone, setPlaylistUndone]);
            // Ensures the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1000);

        };

    }; //!GETPLAYLIST

    /**
     * Retrieves information about a single track identified by its unique ID from the Spotify API.
     * 
     * @function getTrack
     * @async
     * @param {String} id - The ID of the track to retrieve from the Spotify API.
     * @returns {void}
     * @throws {Error} Throws an error if an issue occurs during the token request process.
     */
    const getTrack = async (id) => {

        try {
            /**
             * The API response received from Spotify API.
             * @type {Object}
             * @property {Boolean} ok - Indicates if the response is successful.
             * @property {Object} data - Catalog information about a single track.
             */
            const response = await fetchSpotifyAPI(`${urlBase}/v1/tracks/${id}`, 'GET', authorization);

            if (response.ok) {
                /**
                 * Mapped track data.
                 * @type {Object}
                 */
                const trackData = mapTrackData('spotify', response.data);

                dispatch(setTrack({ ...trackData }));

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());

        } finally {
            // Ensures consistent state updates for 'useEffect' in DiscoverPage and prevents unnecessary re-rendering when navigating with arrows.
            resetStateFlags(dispatch, [setTokenUndone, setPlaylistUndone, setTrackIdUndone]);
            // Ensures the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETTRACK


    return { getPlaylist, getTrack };

};