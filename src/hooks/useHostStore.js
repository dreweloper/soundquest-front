import { useSelector } from "react-redux";
import { fetchSpotifyAPI } from "../api";

export const useHostStore = (props) => {

    // REDUX HOOKS
    /**
     * The 'token' state object from Redux store.
     * @type {Object}
     * @property {String} token_type - The token type ('Bearer').
     * @property {String} access_token - The access token provided by Spotify.
     */
    const { token_type, access_token } = useSelector(state => state.token);

    // FUNCTIONS
    const getUserProfile = async (uid) => {
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
                
                console.log('Todo salió bien.');

            } else {

                response.status == 400 && console.log('Invalid username.');

                response.status == 500 && console.log('Username does not exist.');

            };

        } catch (error) {
            
            console.log('ERROR', error);

        };

    }; //!GETUSERPROFILE


    return { getUserProfile };

};