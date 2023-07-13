import { useDispatch } from "react-redux";
import { setToken, startLoading } from "../store/slices";
import { getCookie, setCookie } from "../helpers/cookies";
import { fetchAPI } from "../api";

/**
 * Custom hook for 'tokenSlice' to handle asynchronous functions.
 * @function useTokenStore
 * @returns {Function}
 */
export const useTokenStore = () => {

    const dispatch = useDispatch();

    /**
     * This function request an access token to Spotify and stores it in the 'token' state and in cookies.
     * @function getToken
     * @async
     */
    const getToken = async () => {

        dispatch(startLoading());

        /**
         * @type {String} Token Spotify endpoint URI.
         */
        const url = 'https://accounts.spotify.com/api/token';


        try {

            const cookieToken = getCookie('token');

            if(cookieToken){ // Conditional: if "cookieToken" is not undefined.

                const { token_type, access_token } = cookieToken; // Destructuring of the properties "token_type" and "access_token" of "cookieToken" object.
                    
                return dispatch(setToken({ token_type, access_token }));

            };

            const response = await fetchAPI(url, 'POST'); // If "cookieToken" is undefined (because cookieToken doesn't exist or is expired).
            
            if(response.ok){

                const { token_type, access_token } = response.data; // Destructuring of the properties "token_type" and "access_token" of "response.data" object.

                dispatch(setToken({ token_type, access_token }));

                setCookie('token', response.data);

            } else {

                throw response; 

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETTOKEN


    return { getToken };

};