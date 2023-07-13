import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../api";
import { finishLoading, setTrack, setTrackID } from "../store/slices";
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

            if (response.ok) {

                const { tracks } = response.data; // Destructuring of the property 'tracks' of 'response.data' object.

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

    /**
     * Get Spotify catalog information for a single track identified by its unique Spotify ID.
     * @function getTrack
     * @async
     * @param {String} id The playlist's track ID.
     * @returns {Object} An object with the track information.
     */
    const getTrack = async (id) => {

        /**
         * @type {String} Authorization fetch header that contains "token_type" (Bearer) and "access_token".
         */
        const authorization = `${token_type} ${access_token}`;

        /**
         * @type {String} Get track Spotify endpoint.
         */
        const url = `https://api.spotify.com/v1/tracks/${id}`;


        try {
            
            const response = await fetchAPI(url, 'GET', authorization);

            if(response.ok){

                const { data } = response;  // Destructuring of the property 'tracks' of 'response' object.

                /**
                 * @typedef {Object} track
                 * @property {String} album The album on which the track appears.
                 * @property {String} artwork The cover art for the album.
                 * @property {String} artist The artists who performed the track.
                 * @property {String} name The name of the track.
                 * @property {String} track_url The Spotify URL for this track.
                 */
                const track = {
                    album: data.album.name,
                    artwork: data.album.images[0].url,
                    artist: data.artists[0].name,
                    name: data.name,
                    track_url: data.external_urls.spotify
                };

                const { album, artwork, artist, name, track_url } = track;

                dispatch(setTrack({ album, artwork, artist, name, track_url }));

                dispatch(finishLoading());

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    };


    return { getPlaylist, getTrack };

};