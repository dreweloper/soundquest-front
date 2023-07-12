import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../api";
import { setTrackID } from "../store/slices";
import { randomTrack } from "../helpers";

/**
 * Custom hook for 'trackSlice' to handle asynchronous functions.
 * @function useTrackStore
 * @returns {Function}
 */
export const useTrackStore = () => {

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
            
            const response = await fetchAPI(url, 'GET', authorization);

            if(response.ok){

                const { tracks } = response.data;

                /**
                 * @type {String} A random track ID.
                 */
                const track_id = randomTrack(tracks.items);

                dispatch(setTrackID({ track_id }));

            } else {

                throw response;

            };

        } catch (error) {

            console.log(error);
            
        };

    };


    return { getPlaylist };

};