import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { getPlaylistURL, randomPlaylist } from "../helpers";
import { finishLoading, setError, setPlaylist } from "../store/slices";

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
    const { token_type, access_token } = useSelector(state => state.token);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    /**
     * Get a list of the playlists owned by a Spotify user.
     * 
     * @function getPlaylist
     * @async
     * @param {String} id - The user's Spotify user ID.
     * @returns {void}
     * @throws {Error} If the user ID doesn't exist or the user hasn't created any playlists yet, an error is thrown.
     */
    const getUserPlaylists = async (id) => {

        /**
         * Authorization header value that contains the token type (Bearer) and the access token.
         * @type {String}
         */
        const authorization = `${token_type} ${access_token}`;

        /**
         * The URL for the Spotify API endpoint that fetches playlists owned by a user.
         * @type {String}
         */
        const url = `https://api.spotify.com/v1/users/${id}/playlists?offset=0&limit=50`;


        try {
            /**
             * The API response received from Spotify API.
             * @type {Object}
             */
            const request = await fetchSpotifyAPI(url, 'GET', authorization);

            if (request.ok) {
               /**
                * Destructured object property from the 'data' object of the 'request'.
                * @type {Array}
                */
                const { items } = request.data;

                // Error handling: This error occurs when the provided user ID doesn't exist or the user hasn't created any playlists yet.
                if (items.length == 0) {

                    dispatch(setError());

                    // Ensure the loading effect lasts longer.
                    setTimeout(() => {

                        dispatch(finishLoading());

                    }, 1500);

                } else {

                    /**
                     * @type {String} A random playlist ID.
                     */
                    const playlist_id = randomPlaylist(items);

                    /**
                     * @type {String} The Spotify's playlist URL for 'playlist_id'.
                     */
                    const playlist_url = getPlaylistURL(items, playlist_id);

                    dispatch(setPlaylist({ playlist_id, playlist_url }));

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


    return { getUserPlaylists };

};