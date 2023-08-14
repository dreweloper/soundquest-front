import { useDispatch, useSelector } from "react-redux";
import { clearError, finishLoading, setDislike, setError, setToken, setTokenDone, setTokenUndone, startLoading } from "../store/slices";
import { getCookie, setCookie } from "../helpers/cookies";
import { fetchSpotifyAPI } from "../api";
import { dispatchWithDelay } from "../helpers";

/**
 * Custom hook for 'tokenSlice' to handle asynchronous functions related to the Spotify access token.
 * 
 * @function useTokenStore
 * @returns {Object} An object containing the following function:
 * - getToken: A function to request and store an access token.
 */
export const useTokenStore = () => {

    // REDUX HOOKS
    const { isLiked } = useSelector(state => state.like);
    const { error } = useSelector(state => state.errors);
    const { token, isTokenDone } = useSelector(state => state.token);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    /**
     * This function request an access token to Spotify and stores it in the 'token' state and in cookies.
     * 
     * @function getToken
     * @async
     * @returns {void}
     * @throws {Error} If an error occurs during the token request process, it logs the error and sets the 'error' state.
     */
    const getToken = async () => {
        /**
         * The Spotify API endpoint URL that provides an access token.
         * @type {String}
         */
        const url = 'https://accounts.spotify.com/api/token';
        

        if (error) dispatch(clearError());

        if (isLiked) dispatch(setDislike());

        if (isTokenDone) dispatch(setTokenUndone());

        dispatch(startLoading());

        // If the 'token' property of the state is already set up.
        if (Object.keys(token).length != 0) return dispatchWithDelay(dispatch, setTokenDone(), 500); // This allows time for Redux to update and trigger the useEffect.

        try {
            /**
             * @type {Object}
             * @property {String} token_type - The token type (Bearer).
             * @property {String} access_token - The access token provided by Spotify.
             * @property {String} expires_in - The token's expiration time (1 hour).
             */
            const cookieToken = getCookie('token');

            // If 'token' exists in cookies.
            if (cookieToken) {

                dispatch(setToken({ ...cookieToken }));

                // If "cookieToken" is undefined (because cookieToken doesn't exist or is expired).
            } else {
                /**
                 * The API response received from Spotify API.
                 * @type {Object}
                 */
                const response = await fetchSpotifyAPI(url, 'POST');

                if (response.ok) {

                    setCookie('token', response.data);

                    dispatch(setToken({ ...response.data }));

                };

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());
            // Ensure the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETTOKEN


    return { getToken };

};