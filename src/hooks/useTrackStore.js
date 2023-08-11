import { useDispatch, useSelector } from "react-redux";
import { fetchMongoDB, fetchSpotifyAPI } from "../api";
import { clearTrack, finishLoading, setError, setTrack, setTrackID } from "../store/slices";
import { dispatchWithDelay, mapTrackData, shuffleArray } from "../helpers";

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
    const { token_type, access_token } = useSelector(state => state.token);
    /**
     * Holds the value of the 'track_id' property extracted from the 'track' state.
     * The name has been changed to prevent conflicts with the constant name.
     * @type {String}
     * @property
     */
    const { track_id } = useSelector(state => state.track);
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
    const spotifyUrlBase = 'https://api.spotify.com';
    /**
     * The URL base of the MongoDB API.
     * @type {String}
     */
    const mongodbUrlBase = 'https://soundquest-xf5r.onrender.com/api/v1';

    //FUNCTIONS
    /**
     * Retrieve playlist information owned or followed by a user from the Spotify API.
     * @function getPlaylist
     * @async
     * @param {String} id The ID of the playlist to retrieve from the Spotify API.
     * @returns {void}
     */
    const getPlaylist = async (id) => {

        try {
            /**
             * The response received from Spotify API.
             * @type {Object}
             */
            const response = await fetchSpotifyAPI(`${spotifyUrlBase}/v1/playlists/${id}?offset=0&limit=50`, 'GET', authorization);

            if (response.ok) {
                /**
                 * Information about the playlist's tracks.
                 * @type {Array<Object>}
                 */
                const { items } = response.data.tracks;

                // Handle the case when the playlist is empty.
                if (items.length == 0) {

                    dispatch(setError());
                    // Ensure the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishLoading(), 1500);

                } else {
                    /**
                     * Array of track IDs extracted from the playlist.
                     * @type {Array<String>}
                     */
                    const arrTrackIDs = items.map(item => item.track.id);
                    /**
                     * A random track ID.
                     * @type {String}
                     */
                    const randomTrackID = shuffleArray(arrTrackIDs);

                    // Clear the current track if the new track is the same as the current. By doing this, the state will always update, ensuring that the `useEffect` in DiscoverPage works consistently.
                    if (randomTrackID == track_id) dispatch(clearTrack());

                    dispatch(setTrackID(randomTrackID));

                };

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());
            // Ensure the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETPLAYLIST

    /**
     * Retrieve track information from the Spotify API.
     * @function getTrack
     * @async
     * @param {String} id - The ID of the track to retrieve from the Spotify API.
     * @returns {void}
     */
    const getTrack = async (id) => {

        try {
            /**
            /* The response received from MongoDB.
            /* @type {Object}
            */
            const mongodbResponse = await fetchMongoDB(`${mongodbUrlBase}/track/${id}`, 'GET');

            if (mongodbResponse.ok) {
                /**
                 * Information about a specific track received from MongoDB.
                 * @type {Object}
                 */
                const mongodbData = mongodbResponse.data[0];
                /**
                 * Map track data.
                 * @type {Object}
                 */
                const trackData = mapTrackData('mongodb', mongodbData);

                dispatch(setTrack({ ...trackData }));

            } else {

                /**
                 * The response received from Spotify API.
                 * @type {Object}
                 */
                const spotifyResponse = await fetchSpotifyAPI(`${spotifyUrlBase}/v1/tracks/${id}`, 'GET', authorization);

                if (spotifyResponse.ok) {
                    /**
                     * Information about a specific track received from the Spotify Web API.
                     * @type {Object}
                     */
                    const spotifyData = spotifyResponse.data;
                    /**
                     * Map track data.
                     * @type {Object}
                     */
                    const trackData = mapTrackData('spotify', spotifyData);

                    dispatch(setTrack({ ...trackData }));

                };

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());

        } finally {

            // Ensure the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETTRACK


    return { getPlaylist, getTrack };

};