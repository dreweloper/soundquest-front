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
    const { token: { token_type, access_token }} = useSelector(state => state.token);
    /**
     * The 'playlist' state object from Redux store.
     * @type {Object}
     * @property {String} playlist_id - A randomly selected playlist ID..
     * @property {Boolean} isPlaylistDone - It indicates whether the state processing is complete.
     */
    const { playlist: { playlist_id }, isPlaylistDone } = useSelector(state => state.playlist);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

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
        const url = `https://api.spotify.com/v1/users/${uid}/playlists?offset=0&limit=50`;


        try {
            /**
             * The API response received from Spotify API.
             * @type {Object}
             * @property {Boolean} ok - Indicates if the response is successful.
             * @property {Object} data - A list of the playlists owned or followed by a Spotify user.
             */
            const response = await fetchSpotifyAPI(url, 'GET', authorization);

            if (response.ok) {
               /**
                * Information about the user's playlists.
                * @type {Array<Object>}
                */
                const { items } = response.data;

                // Handle the case when the provided user ID doesn't exist, or the user hasn't created any playlist yet.
                if (items.length == 0) {

                    dispatch(setError());
                    // Ensure the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishLoading(), 1500);

                } else {
                    /**
                     * Array of playlist IDs extracted from the user's playlists information.
                     * @type {Array<String>} 
                     */
                    const arrPlaylistIDs = items.map(playlist => playlist.id);
                    /**
                     * A randomly selected playlist ID.
                     * @type {String}
                     */
                    const randomPlaylistID = shuffleArray(arrPlaylistIDs);
                    /**
                     * The URL for the Spotify playlist with the given 'randomPlaylistID'.
                     * @type {String}
                     */
                    const PlaylistUrl = getPlaylistURL(items, randomPlaylistID);

                    // If the new playlist is the same as the current.
                    if(randomPlaylistID == playlist_id) {

                        dispatch(setPlaylistDone());

                    } else {

                        dispatch(setPlaylist({ randomPlaylistID, PlaylistUrl }));

                    };
                };
            };
            
        } catch (error) {

            console.log(error);

            dispatch(setError());
            // Ensures consistent state updates for 'useEffect' in DiscoverPage and prevents unnecessary re-rendering when navigating with arrows.
            dispatch(setTokenUndone());
            // Ensure the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETUSERPLAYLISTS


    return { getUserPlaylists };

};