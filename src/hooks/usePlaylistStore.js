import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { shuffleArray } from "../helpers";
import { finishLoading, setError, setPlaylist, setPlaylistDone, setTokenUndone } from "../store/slices";

/**
 * Custom hook for 'playlistSlice' to handle asynchronous functions.
 * 
 * This hook provides a function 'getUserPlaylists' to get a list of playlists owned by a Spotify user. The function uses the Spotify Web API to fetch the user's playlists and then retrieves a random playlist ID and its URL to set the 'playlist' state in Redux.
 *
 * @function usePlaylistStore
 * @returns {Object} An object containing the following function:
 * - getUserPlaylists: A function to get a list of playlists owned by a Spotify user.
 */
export const usePlaylistStore = () => {

    // REDUX HOOKS
    /**
     * The 'token' state object from Redux store.
     * @type {Object}
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token: { token_type, access_token } } = useSelector(state => state.token);
    /**
     * The 'playlist' state object from Redux store.
     * @type {Object}
     * @property {String} playlist_id - A randomly selected playlist ID..
     * @property {Boolean} isPlaylistDone - It indicates whether the state processing is complete.
     */
    const { playlist: { playlist_id } } = useSelector(state => state.playlist);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    //FUNCTIONS
    /**
     * Handles the selection of a random playlist ID and its URL and updates the Redux state accordingly.
     * 
     * @function handlePlaylistSelection
     * @param {Array<Object>} items - Information about the user's playlists.
     * @param {Array<String>} arrayPlaylistIds - Array of playlist IDs extracted from the user's playlists information.
     * @returns {void}
     */
    const handlePlaylistSelection = (items, arrayPlaylistIds) => { //! refact: que reciba por arg solo 'items' y el map de 'arrayPlaylistIds' lo haga dentro de la func. El return será un objeto con randomPlaylistId, playlistUrl y arrayPlaylistIds, para poder pasarlo a 'handleActions'. Ver cómo se puede refact con un objeto y payload para el dispatch success.
        /**
         * A randomly selected playlist ID.
         * @type {String}
         */
        let randomPlaylistId;
        /**
         * The URL for the Spotify playlist with the given 'randomPlaylistId'.
         * @type {String}
         */
        let playlistUrl;
        /**
         * Total tracks in the playlist.
         * To prevent errors from occurring, the default value is set to 0, as the track object might be null if a track is no longer available.
         * @type {Number}
         */
        let totalTracks;

        do {

            randomPlaylistId = shuffleArray(arrayPlaylistIds);
            //! refact: esto podría ser una función (find) aparte también e incluso un helper en caso de que se utilice en 'useTrackStore', por ej.
            totalTracks = items.find(playlist => playlist.id == randomPlaylistId)?.tracks.total || 0;

            if (totalTracks > 0) {

                playlistUrl = items.find(playlist => playlist.id == randomPlaylistId)?.external_urls.spotify;

            } else { //! refact: crear helper "removeElement"
                /**
                 * Finds the index of the empty playlist.
                 * @type {Number}
                 */
                const playlistIdIndex = arrayPlaylistIds.findIndex(item => item == randomPlaylistId);
                // Removes empty playlists.
                if(playlistIdIndex != -1) arrayPlaylistIds.splice(playlistIdIndex, 1);
                
            };

        } while (totalTracks == 0 && arrayPlaylistIds.length > 0);
        //! refact: crear función 'handleAction' y que sea un switch, por ejemplo.
        // Handles the case where all the playlists are empty.
        if (arrayPlaylistIds.length == 0) {

            dispatch(setError()); //! En el componente Error habría que dar la opción de informar que el usuario solo tiene playlists vacías y dar la opción de cambiar de host.

        // Handles the case where the new playlist is the same as the current.
        } else if (randomPlaylistId == playlist_id) {

            dispatch(setPlaylistDone());

        } else {

            dispatch(setPlaylist({ randomPlaylistId, playlistUrl }));

        };

    }; //!HANDLEPLAYLISTSELECTION

    /**
     * Handles an error dispatching error-related actions.
     *
     * @function handleCatchError
     * @returns {void}
     */
    const handleError = () => {

        dispatch(setError());
        // Ensures consistent state updates for 'useEffect' in DiscoverPage and prevents unnecessary re-rendering when navigating with arrows.
        dispatch(setTokenUndone());
        // Ensures the loading effect lasts longer.
        dispatchWithDelay(dispatch, finishLoading(), 1500);

    }; //!HANDLEERROR

    /**
     * Fetches user playlists from the Spotify Web API and updates the Redux state.
     * 
     * @function getPlaylist
     * @async
     * @param {String} uid - The user's Spotify identifier.
     * @returns {void}
     * @throws {Error} Throws an error if an issue occurs during the token request process.
     */
    const getUserPlaylists = async (uid) => {
        /**
         * Authorization header value that contains the token type (Bearer) and the access token.
         * @type {String}
         */
        const authorization = `${token_type} ${access_token}`;
        /**
         * The Spotify API endpoint URL that fetches the playlists owned or followed by a user.
         * @type {String}
         */
        const urlBase = 'https://api.spotify.com';


        try {
            /**
             * The API response received from Spotify API.
             * @type {Object}
             * @property {Boolean} ok - Indicates if the response is successful.
             * @property {Object} data - A list of the playlists owned or followed by a Spotify user.
             */
            const response = await fetchSpotifyAPI(`${urlBase}/v1/users/${uid}/playlists?offset=0&limit=50`, 'GET', authorization);

            if (response.ok) {
                /**
                 * @type {Object}
                 * @property {Number} total - The total number of items (array of simplified playlist object) available to return.
                 * @property {Array<Object>} items - Information about the user's playlists.
                 */
                const { total, items } = response.data;
                /**
                 * Array of playlist IDs extracted from the user's playlists information.
                 * @type {Array<String>} 
                 */
                const arrayPlaylistIds = items.map(playlist => playlist.id);

                // Handles the case where the user has over 50 public playlists.
                if (total > 50) { //! refact: hacer una función 'generateRandomOffset', por ej.
                    /**
                     * Generates a random number within a specified range ('total').
                     * @type {Number}
                     */
                    const randomNum = Math.floor(Math.random() * total) + 1;
                    /**
                     * The offset of the items returned.
                     * Ensures the response always returns the maximum number of "items" (playlists).
                     * 50 is the maximum number of "items" in the response ("limit" query param).
                     * @type {Number}
                     */
                    const offset = (total - randomNum) < 50 ? total - 50 : randomNum;
                     /**
                     * The API response received from Spotify API.
                     * @type {Object}
                     * @property {Boolean} ok - Indicates if the response is successful.
                     * @property {Object} data - A list of the playlists owned or followed by a Spotify user.
                     */
                    const newResponse = await fetchSpotifyAPI(`${urlBase}/v1/users/${uid}/playlists?offset=${offset}&limit=50`, 'GET', authorization);

                    if (newResponse.ok) {
                        /**
                         * Information about the user's playlists.
                         * @type {Array<Object>}
                         */
                        const newItems = newResponse.data.items;
                        /**
                         * Array of playlist IDs extracted from the user's playlists information.
                         * @type {Array<String>} 
                         */
                        const newArrayPlaylistIds = newItems.map(playlist => playlist.id);
                        // Handles the case when the playlist is empty to prevent errors from occurring.
                        handlePlaylistSelection(newItems, newArrayPlaylistIds);

                    } else {
                        // Handle bad request error.
                        handleError();

                    };

                } else {
                    // This approach eliminates the need for an additional fetch to the Spotify API.
                    handlePlaylistSelection(items, arrayPlaylistIds);

                };

            } else {
                // Handle bad request error.
                handleError();

            };

        } catch (error) {

            console.log(error);

            handleError();

        };

    }; //!GETUSERPLAYLISTS


    return { getUserPlaylists };

};