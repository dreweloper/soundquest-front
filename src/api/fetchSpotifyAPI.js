/**
 * Fetch function that connects with Spotify's Web API.
 * @function fetchSpotifyAPI
 * @async
 * @param {String} url Spotify's endpoint.
 * @param {String} method HTTP verb for the request.
 * @param {String} token Authorization header's value that contains "token_type" (Bearer) and "access_token".
 * @returns {Promise}
 */
export const fetchSpotifyAPI = async (url, method, token) => {

    /**
     * Fetch options.
     * @typedef {Object} options
     * @property {String} method HTTP verb for the request.
     * @property {Object} body URLSearchParams object that contains the Client ID and Client Secret, along with the grant_type parameter set to client_credentials.
     * @property {Object} headers Content-type header set to the application/x-www-form-urlencoded value or Authentication header set to token type "Bearer" and the token itself.
     */
    let options = {};


    if(method == 'POST'){
        options = {
            method,
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': import.meta.env.VITE_CLIENT_ID,
                'client_secret': import.meta.env.VITE_CLIENT_SECRET
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
    };


    if(method == 'GET'){
        options = {
            headers: { Authorization: token }
        };
    };


    try {
        
        const response = await fetch(url, options);

        if(response.ok){

            const data = await response.json();

            return {
                ok: true,
                data
            };

        } else {

            throw response;

        };
        
    } catch (error) {
        
        return error;

    };

}
