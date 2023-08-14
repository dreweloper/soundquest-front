import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { getPlaylistURL, shuffleArray } from "../helpers";
import { finishLoading, setError, setPlaylist, setPlaylistDone, setPlaylistUndone } from "../store/slices";

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
     * Holds the value of the 'playlist_id' property extracted from the 'playlist' state.
     * The name has been changed to prevent conflicts with the constant name.
     * @type {String}
     * @property
     */
    const { playlist: { playlist_id }, isPlaylistDone } = useSelector(state => state.playlist);
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
     * @param {String} uid - The user's Spotify ID.
     * @returns {void}
     * @throws {Error} If the user ID doesn't exist or the user hasn't created any playlists yet, an error is thrown.
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

        // By doing this, the state will always update, ensuring that the `useEffect` in DiscoverPage works consistently.
        if(isPlaylistDone) dispatch(setPlaylistUndone());

        try {
            /**
             * The response received from Spotify API.
             * @type {Object}
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
                     * A random playlist ID.
                     * @type {String}
                     */
                    const randomPlaylistID = shuffleArray(arrPlaylistIDs);
                    /**
                     * The URL for the Spotify playlist with the given 'playlist_id'.
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
            // Ensure the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETUSERPLAYLISTS


    return { getUserPlaylists };

};