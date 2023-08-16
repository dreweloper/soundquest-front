import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { getPlaylistURL, shuffleArray } from "../helpers";
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
         * @type {Number}
         */
        let totalTracks;


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
                 * The total number of items (array of simplified playlist object) available to return.
                 * @type {Number}
                 */
                const { total } = response.data;

                // Handles the case where the user has over 50 public playlists.
                if (total > 50) {
                    /**
                     * Generates a random number within a specified range.
                     * @type {Number}
                     */
                    const randomNum = Math.floor(Math.random() * total) + 1;
                    /**
                     * //!50 porque es el valor máximo que admite Spotify por el query param "limit".
                     * //!De esta forma se asegura que la respuesta siempre devolverá el número máximo de "items" (playlists).
                     * @type {Number}
                     */
                    const offset = (total - randomNum) < 50 ? total - 50 : randomNum;

                    const newResponse = await fetchSpotifyAPI(`${urlBase}/v1/users/${uid}/playlists?offset=${offset}&limit=50`, 'GET', authorization);

                    if (newResponse.ok) {
                        /**
                         * Information about the user's playlists.
                         * @type {Array<Object>}
                         */
                        const { items } = newResponse.data;
                        /**
                         * Array of playlist IDs extracted from the user's playlists information.
                         * @type {Array<String>} 
                         */
                        const arrayPlaylistIds = items.map(playlist => playlist.id);

                        // Handles the case when the playlist is empty to prevent errors from occurring.
                        do {

                            randomPlaylistId = shuffleArray(arrayPlaylistIds);

                            totalTracks = items.find(playlist => playlist.id == randomPlaylistId)?.tracks.total;

                            if (totalTracks > 0) {

                                playlistUrl = items.find(playlist => playlist.id == randomPlaylistId)?.external_urls.spotify;

                            } else {
                                /**
                                 * Finds the index of the empty playlist.
                                 * @type {Number}
                                 */
                                const playlistIdIndex = arrayPlaylistIds.findIndex(item => item == randomPlaylistId);
                                // Removes empty playlists.
                                arrayPlaylistIds.splice(playlistIdIndex, 1);

                            };

                        } while (totalTracks == 0 && arrayPlaylistIds.length > 0);

                        //! Maneja el error en caso de que todas las playlists estén vacías.
                        //! En el componente Error habría que dar la opción de informar que el usuario solo tiene playlists vacías y dar la opción de cambiar de host.
                        if (arrayPlaylistIds.length == 0) return dispatch(setError());

                        // Handles the case where the new playlist is the same as the current.
                        randomPlaylistId == playlist_id ? dispatch(setPlaylistDone()) : dispatch(setPlaylist({ randomPlaylistId, playlistUrl }));

                    } else {

                        //! handle bad request error
                        console.log('BAD REQUEST ERROR');

                    };

                // This approach eliminates the need for an additional fetch to the Spotify API.
                } else {
                    /**
                     * Information about the user's playlists.
                     * @type {Array<Object>}
                     */
                    const { items } = response.data;
                    /**
                     * Array of playlist IDs extracted from the user's playlists information.
                     * @type {Array<String>} 
                     */
                    const arrayPlaylistIds = items.map(playlist => playlist.id);

                    // Handles the case when the playlist is empty to prevent errors from occurring.
                    do {

                        randomPlaylistId = shuffleArray(arrayPlaylistIds);

                        totalTracks = items.find(playlist => playlist.id == randomPlaylistId)?.tracks.total;

                        if (totalTracks > 0) {

                            playlistUrl = items.find(playlist => playlist.id == randomPlaylistId)?.external_urls.spotify;

                        } else {
                            /**
                             * Finds the index of the empty playlist.
                             * @type {Number}
                             */
                            const playlistIdIndex = arrayPlaylistIds.findIndex(item => item == randomPlaylistId);
                            // Removes empty playlists.
                            arrayPlaylistIds.splice(playlistIdIndex, 1);

                        };

                    } while (totalTracks == 0 && arrayPlaylistIds.length > 0);

                    //! Maneja el error en caso de que todas las playlists estén vacías.
                    //! En el componente Error habría que dar la opción de informar que el usuario solo tiene playlists vacías y dar la opción de cambiar de host.
                    if (arrayPlaylistIds.length == 0) return dispatch(setError());

                    // Handles the case where the new playlist is the same as the current.
                    randomPlaylistId == playlist_id ? dispatch(setPlaylistDone()) : dispatch(setPlaylist({ randomPlaylistId, playlistUrl }));

                };

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());
            // Ensures consistent state updates for 'useEffect' in DiscoverPage and prevents unnecessary re-rendering when navigating with arrows.
            dispatch(setTokenUndone());
            // Ensures the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETUSERPLAYLISTS


    return { getUserPlaylists };

};