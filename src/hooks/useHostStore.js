import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { dispatchWithDelay } from "../helpers";
import { clearErrorHost, closeHostForm, finishHostLoading, setErrorHost, setHost, startHostLoading } from "../store/slices";

/**
 * Custom hook for 'hostSlice' to handle asynchronous functions.
 * @function useHostStore
 * @returns {Object} An object containing the following function:
 * - getUserProfile: The function checks the user's Spotify account existence and the presence of public playlists using the provided ID.
 */
export const useHostStore = () => {

    // REDUX HOOKS
    /**
     * The 'token' state object from Redux store.
     * @type {Object}
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token: { token_type, access_token }} = useSelector(state => state.token);
    /**
     * The 'host' state object from Redux store.
     * @type {Object}
     * @property {Boolean} errorHost - Indicates whether there has been an error or not while attempting to modify the host.
     */
    const { error: { errorHost }} = useSelector(state => state.host);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // FUNCTIONS
    /**
     * Checks the user's Spotify account existence and the presence of public playlists using the provided ID.
     * 
     * @function getUserProfile
     * @async
     * @param {String} uid - The user's Spotify ID.
     * @returns {void}
     */
    const getUserProfile = async (uid) => {
        
        // Clears the error message in case of a successful retry.
        if(errorHost) dispatch(clearErrorHost());

        dispatch(startHostLoading());

        /**
         * Authorization header value that contains the token type (Bearer) and the access token.
         * @type {String}
         */
        const authorization = `${token_type} ${access_token}`;
        /**
         * The URL base for the Spotify API endpoints.
         * @type {String}
         */
        const urlBase = `https://api.spotify.com/v1/users`;

        try {

            /**
             * The response received from Spotify API.
             * @type {Object}
             */
            const response = await fetchSpotifyAPI(`${urlBase}/${uid}`, 'GET', authorization);

            if (response.ok) {

                /**
                 * The response received from Spotify API.
                 * @type {Object}
                 * @property {Object} data - The public profile information about a Spotify user.
                 */
                const { data } = await fetchSpotifyAPI(`${urlBase}/${uid}/playlists`, 'GET', authorization);
                /**
                 * A list of the playlists owned or followed by a Spotify user.
                 * @type {Array}
                 */
                const { items } = data;

                // The user exists and has public playlists.
                if (items.length > 0) {
                    /**
                     * The URL for the Spotify user's profile.
                     * @type {String}
                     */
                    const profileUrl = response.data.external_urls.spotify;

                    dispatch(setHost({ uid, profileUrl }));
                    // Ensures the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishHostLoading());
                    // Ensures the window close effect lasts longer than loading effect.
                    dispatchWithDelay(dispatch, closeHostForm(), 3000);

                // Handles the case that the user doesn't have any public playlists.
                } else {

                    dispatch(setErrorHost(`The user doesn't have any public playlists.`));
                    // Ensures the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishHostLoading());

                };

            } else {

                // Status 400: invalid username
                if (response.status == 400) {

                    dispatch(setErrorHost('Invalid username.'));
                    // Ensures the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishHostLoading());

                };

                // Status 500: username doesn't exist.
                if (response.status == 500) {

                    dispatch(setErrorHost(`The username doesn't exist.`));
                    // Ensures the loading effect lasts longer.
                    dispatchWithDelay(dispatch, finishHostLoading());

                };

            };

        } catch (error) {

            dispatch(setErrorHost(`Internal server error. Try again later.`));
            // Ensures the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishHostLoading());

        };

    }; //!GETUSERPROFILE


    return { getUserProfile };

};