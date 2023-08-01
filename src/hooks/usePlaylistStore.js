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
     * @throws {Error} If the request to the Spotify Web API fails, it throws an error.
     */
    const getUserPlaylists = async (id) => {

        /**
         * @type {String} Authorization fetch header that contains "token_type" (Bearer) and "access_token".
         */
        const authorization = `${token_type} ${access_token}`;

        /**
         * @type {String} Get user's playlists Spotify endpoint.
         */
        const url = `https://api.spotify.com/v1/users/${id}/playlists?offset=0&limit=50`;


        try {
            
            const response = await fetchSpotifyAPI(url, 'GET', authorization);

            if(response.ok){

                const { data } = response; // Destructuring of the property 'data' of the 'response' object.

                /**
                 * @type {String} A random playlist ID.
                 */
                const playlist_id = randomPlaylist(data.items);

                /**
                 * @type {String} The Spotify's playlist URL for 'playlist_id'.
                 */
                const playlist_url = getPlaylistURL(data.items, playlist_id);

                dispatch(setPlaylist({ playlist_id, playlist_url }));

            } else {
                
                dispatch(setError());

                dispatch(finishLoading());

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETPLAYLIST


    return { getUserPlaylists };

};