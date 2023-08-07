import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { clearErrorHost, closeHostForm, setErrorHost, setHost } from "../store/slices";

export const useHostStore = (props) => {

    // REDUX HOOKS
    /**
     * The 'token' state object from Redux store.
     * @type {Object}
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token_type, access_token } = useSelector(state => state.token);
    const { errorHost } = useSelector(state => state.host);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // FUNCTIONS
    const getUserProfile = async (uid) => {

        errorHost && dispatch(clearErrorHost()); // To clear the error message in case of a successful retry.

        /**
         * Authorization header value that contains the token type (Bearer) and the access token.
         * @type {String}
         */
        const authorization = `${token_type} ${access_token}`;
        /**
         * The URL for the Spotify API endpoint that fetches information about a user.
         * @type {String}
         */
        const url = `https://api.spotify.com/v1/users/${uid}`;

        try {
            
            const response = await fetchSpotifyAPI(url, 'GET', authorization);

            if(response.ok) {

                //! llamada para comprobar si tiene o no playlists

                const host = response.data.id;
                
                dispatch(setHost(host));

                dispatch(closeHostForm());

            } else {

                // Status 400: invalid username
                if(response.status == 400) dispatch(setErrorHost());
                // Status 500: username doesn't exist.
                if(response.status == 500) dispatch(setErrorHost());

            };

        } catch (error) {
            
            console.log(error);

            dispatch(setErrorHost());

        };

    }; //!GETUSERPROFILE


    return { getUserProfile };

};