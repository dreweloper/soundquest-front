/**
 * Fetch function that connects with Spotify's Web API.
 *
 * This function sends HTTP requests to Spotify's Web API using the provided URL, HTTP method, and authorization token.
 *
 * @async
 * @function fetchSpotifyAPI
 * @param {String} url - The URL of Spotify's endpoint.
 * @param {String} method - The HTTP verb for the request ('POST' or 'GET').
 * @param {String} token - The authorization header's value that contains "token_type" (Bearer) and "access_token".
 * @returns {Promise<{ ok: Boolean, data: any }|Error>} A Promise that resolves to an object with properties 'ok' (true) and 'data' (JSON response data) if the request is successful. Otherwise, it rejects with an Error object representing the error occurred during the request.
 */
export const fetchSpotifyAPI = async (url, method, token) => {

    /**
     * Fetch options for the HTTP request.
     * @typedef {Object} FetchOptions
     * @property {string} method - The HTTP verb for the request.
     * @property {URLSearchParams} [body] - URLSearchParams object that contains the Client ID and Client Secret, along with the grant_type parameter set to client_credentials (only present in 'POST' requests).
     * @property {Object} [headers] - An object containing request headers. It includes the 'Content-Type' header set to the 'application/x-www-form-urlencoded' value in 'POST' requests, or the 'Authorization' header set to the token type "Bearer" and the token itself in 'GET' requests.
     */
    let options = {};


    if (method == 'POST') {
        /**
         * @type {FetchOptions}
         */
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


    if (method == 'GET') {
        /**
         * @type {FetchOptions}
         */
        options = {
            headers: { Authorization: token }
        };
    };


    try {

        const request = await fetch(url, options);

        if (request.ok) {

            /**
             * The JSON data received from the successful HTTP response.
             * @type {any}
             */
            const data = await request.json();

            return {
                ok: true,
                data
            };

        } else {

            throw {
                ok: false,
                status: request.status,
            };

        };

    } catch (error) {

        return error;

    };

};