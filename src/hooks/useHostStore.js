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
     * @property {Object} token
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token: { token_type, access_token } } = useSelector(state => state.token);
    /**
     * The 'host' state object from Redux store.
     * @type {Object}
     * @property {Object} error
     * @property {Boolean} errorHost - Indicates whether there has been an error or not while attempting to modify the host.
     */
    const { error: { errorHost } } = useSelector(state => state.host);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // FUNCTIONS
    /**
     * Handles the case that the user exists and has at least one public playlist.
     * @function handleHostUpdateSuccess
     * @param {String} uid - The user's Spotify ID.
     * @param {String} profileUrl - The URL for the Spotify user's profile.
     * @returns {void}
     */
    const handleHostUpdateSuccess = (uid, profileUrl) => {

        dispatch(setHost({ uid, profileUrl }));
        // Ensures the loading effect lasts longer.
        dispatchWithDelay(dispatch, finishHostLoading());
        // Ensures the window close effect lasts longer than loading effect.
        dispatchWithDelay(dispatch, closeHostForm(), 3000);

    }; //!HANDLEHOSTUPDATESUCCESS
    /**
     * Handles the case that the user doesn't have any public playlists.
     * @function handleNoPublicPlaylistsError
     * @returns {void}
     */
    const handleNoPublicPlaylistsError = () => {

        dispatch(setErrorHost(`The user doesn't have any public playlists.`));
        // Ensures the loading effect lasts longer.
        dispatchWithDelay(dispatch, finishHostLoading());

    }; //!HANDLENOPUBLICPLAYLISTSERROR
    /**
     * Handles the case that the provided username is invalid.
     * @function handleInvalidUsernameError
     * @returns {void}
     */
    const handleInvalidUsernameError = () => {

        dispatch(setErrorHost('Invalid username.'));
        // Ensures the loading effect lasts longer.
        dispatchWithDelay(dispatch, finishHostLoading());

    }; //!HANDLEINVALIDUSERNAMEERROR
    /**
     * Handles the case that the provided username doesn't exist.
     * @function handleUserNotFoundError
     * @returns {void}
     */
    const handleUserNotFoundError = () => {

        dispatch(setErrorHost(`The username doesn't exist.`));
        // Ensures the loading effect lasts longer.
        dispatchWithDelay(dispatch, finishHostLoading());

    }; //!HANDLEUSERNOTFOUNDERROR
    /**
     * Handles internal server errors.
     * @function handleInternalServerError
     * @returns {void}
     */
    const handleInternalServerError = () => {

        dispatch(setErrorHost(`Internal server error. Try again later.`));
        // Ensures the loading effect lasts longer.
        dispatchWithDelay(dispatch, finishHostLoading());

    }; //!HANDLEINTERNALSERVERERROR

    /**
     * Checks the user's Spotify account existence and the presence of public playlists using the provided ID.
     * 
     * @function getUserProfile
     * @async
     * @param {String} uid - The user's Spotify ID.
     * @returns {void}
     */
    const getUserProfile = async (uid) => {
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

        // Clears the error message in case of a successful retry.
        if (errorHost) dispatch(clearErrorHost());

        dispatch(startHostLoading());

        try {
            /**
             * The API response received from Spotify API.
             * @type {Object}
             * @property {Boolean} ok - Indicates if the response is successful.
             * @property {Object} data - Public profile information about a Spotify user.
             */
            const response = await fetchSpotifyAPI(`${urlBase}/${uid}`, 'GET', authorization);

            if (response.ok) {
                /**
                 * The response received from Spotify API.
                 * @type {Object}
                 * @property {Object} data - The public profile information about a Spotify user.
                 * @property {Array} items - A list of the playlists owned or followed by a Spotify user.
                 */
                const { data: { items }} = await fetchSpotifyAPI(`${urlBase}/${uid}/playlists`, 'GET', authorization);

                items.length == 0 ? handleNoPublicPlaylistsError() : handleHostUpdateSuccess(uid, response.data.external_urls.spotify);

            } else {

                if (response.status == 400) handleInvalidUsernameError();

                if (response.status == 500) handleUserNotFoundError();

            };

        } catch (error) {

            handleInternalServerError();

        };

    }; //!GETUSERPROFILE


    return { getUserProfile };

};