import { useDispatch, useSelector } from "react-redux";
import { getCookie, setCookie } from "../helpers/cookies";
import { fetchSpotifyAPI } from "../api";
import { dispatchWithDelay } from "../helpers";
import { clearError, finishLoading, setDislike, setError, setToken, setTokenDone, startLoading } from "../store/slices";

/**
 * Custom hook for 'tokenSlice' to handle asynchronous functions related to the Spotify access token.
 * 
 * @function useTokenStore
 * @returns {Object} An object containing the following function:
 * - getToken: A function to request and store an access token.
 */
export const useTokenStore = () => {

    // REDUX HOOKS
    /**
     * The 'like' state object from Redux store.
     * @type {Object}
     * @property {Boolean} isLiked
     */
    const { isLiked } = useSelector(state => state.like);
    /**
     * The 'error' state object from Redux store.
     * @type {Object}
     * @property {Boolean} error
     */
    const { error } = useSelector(state => state.errors);
    /**
     * The 'like' state object from Redux store.
     * @type {Object}
     * @property {Object} token - The access token supplied by the Spotify Web API.
     * @property {Boolean} isTokenDone - It indicates whether the state processing is complete.
     */
    const { token } = useSelector(state => state.token);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // VARIABLES
    /**
     * The Spotify API endpoint URL that provides an access token.
     * @type {String}
     */
    const url = 'https://accounts.spotify.com/api/token';

    // FUNCTIONS
    /**
     * Requests an access token from Spotify, stores it in the 'token' state, and in cookies.
     * 
     * @function getToken
     * @async
     * @returns {void}
     * @throws {Error} Throws an error if an issue occurs during the token request process.
     */
    const getToken = async () => {
        // Clears error state if previously set.
        if(error) dispatch(clearError());
        // If 'isLiked' flag is set, dispatch 'setDislike' action.
        if(isLiked) dispatch(setDislike());

        dispatch(startLoading());

        // If the 'token' property of the state is already set, update 'isTokenDone' flag and return.
        if(Object.keys(token).length != 0) return dispatch(setTokenDone()); // Delay helps trigger useEffect in Redux.

        try {
            /**
             * @type {Object}
             * @property {String} token_type - The token type (Bearer).
             * @property {String} access_token - The access token provided by Spotify.
             * @property {String} expires_in - The token's expiration time (1 hour).
             */
            const cookieToken = getCookie('token'); // Try to retrieve token from cookies.

            if (cookieToken) {
                // If 'token' exists in cookies, set it in state.
                dispatch(setToken({ ...cookieToken }));

            } else {
                // If "cookieToken" is undefined (because cookieToken doesn't exist or is expired).
                /**
                 * The API response received from Spotify API.
                 * @type {Object}
                 * @property {Boolean} ok - Indicates if the response is successful.
                 * @property {Object} data - An access token valid for 1 hour.
                 */
                const response = await fetchSpotifyAPI(url, 'POST');

                if (response.ok) {
                    // Stores token in cookies.
                    setCookie('token', response.data);
                    // Sets token in state.
                    dispatch(setToken({ ...response.data }));

                };

            };

        } catch (error) {

            console.log(error);

            dispatch(setError());
            // Ensures the loading effect lasts longer.
            dispatchWithDelay(dispatch, finishLoading(), 1500);

        };

    }; //!GETTOKEN


    return { getToken };

};