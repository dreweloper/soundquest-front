import { useDispatch, useSelector } from "react-redux";
import { clearError, clearToken, finishLoading, setDislike, setError, setToken, startLoading } from "../store/slices";
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
    const { like } = useSelector(state => state.like);
    const { error } = useSelector(state => state.errors);
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

        if(error) dispatch(clearError());

        if(like) dispatch(setDislike());

        dispatch(clearToken());

        dispatch(startLoading());

        /**
         * The Spotify API endpoint URL that provides an access token.
         * @type {String}
         */
        const url = 'https://accounts.spotify.com/api/token';


        try {
            /**
             * The value of the 'token' cookie retrieved using the 'getCookie' function.
             * @type {String}
             * @see getCookie
             */
            const cookieToken = getCookie('token');

            // If 'token' exists in cookies.
            if(cookieToken){
                /**
                 * @type {Object}
                 * @property {String} token_type - The token type (Bearer).
                 * @property {String} access_token - The access token provided by Spotify.
                 */
                const { token_type, access_token } = cookieToken;
                    
                return dispatch(setToken({ token_type, access_token }));

            };

            /**
             * The API response received from Spotify API.
             * @type {Object}
             */
            const response = await fetchSpotifyAPI(url, 'POST'); // If "cookieToken" is undefined (because cookieToken doesn't exist or is expired).
            
            if(response.ok){
                /**
                 * @type {Object}
                 * @property {String} token_type - The token type (Bearer).
                 * @property {String} access_token - The access token provided by Spotify.
                 */
                const { token_type, access_token } = response.data; // Destructuring of the properties "token_type" and "access_token" of "response.data" object.

                dispatch(setToken({ token_type, access_token }));

                setCookie('token', response.data); // 'response.data' is the token object returned by Spotify.

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