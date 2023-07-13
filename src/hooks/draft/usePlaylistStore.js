import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../api";
import { getPlaylistURL, randomPlaylist } from "../../helpers";
import { setPlaylist } from "../../store/slices";

/**
 * Custom hook for 'playlistSlice' to handle asynchronous functions.
 * @function usePlaylistStore
 * @returns {Function}
 */
export const usePlaylistStore = () => {

    const { token_type, access_token } = useSelector(state => state.token); // Destructuring of the properties 'token_type' and 'access_token' of 'token' state's object.

    const dispatch = useDispatch();

    /**
     * Get a list of the playlists owned or followed by a Spotify user.
     * @function getPlaylist
     * @async
     * @param {String} id The user's Spotify user ID.
     * @returns A random Playlist ID and it's URL.
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
            
            const response = await fetchAPI(url, 'GET', authorization);

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

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETPLAYLIST


    return { getUserPlaylists };

};