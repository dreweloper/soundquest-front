import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";
import { clearErrorHost, closeHostForm, setErrorHost, setHost } from "../store/slices";

export const useHostStore = () => {

    // REDUX HOOKS
    /**
     * The 'token' state object from Redux store.
     * @type {Object}
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token_type, access_token } = useSelector(state => state.token);
    const { errorHost, errorMessage } = useSelector(state => state.host);
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
         * The URL base for the Spotify API endpoints.
         * @type {String}
         */
        const urlBase = `https://api.spotify.com/v1/users`;

        try {

            const response = await fetchSpotifyAPI(`${urlBase}/${uid}`, 'GET', authorization);

            if (response.ok) {

                const { data } = await fetchSpotifyAPI(`${urlBase}/${uid}/playlists`, 'GET', authorization);

                const { items } = data;

                if (items.length > 0) { // The user exists and has public playlists.

                    dispatch(setHost(uid));

                    dispatch(closeHostForm());

                } else { // The user doesn't have any public playlists.
                    
                    dispatch(setErrorHost(`The user doesn't have any public playlists.`));

                };

            } else {

                // Status 400: invalid username
                if (response.status == 400) dispatch(setErrorHost('Invalid username.'));
                // Status 500: username doesn't exist.
                if (response.status == 500) dispatch(setErrorHost(`The username doesn't exist.`));

            };

        } catch (error) {

            console.log(error);

            dispatch(setErrorHost(`Internal server error.`));

        };

    }; //!GETUSERPROFILE


    return { getUserProfile };

};