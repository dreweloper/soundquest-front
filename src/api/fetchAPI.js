/**
 * To make requests to an API.
 * @function fetchAPI
 * @async
 * @param {String} url API endpoint.
 * @param {String} token Authentication header Bearer token.
 * @returns {Promise} A request object at first and a JSON response body at last.
 */
export const fetchAPI = async (url, method, token) => {

    /**
     * @typedef {Object} options
     * @property {String} [headers] Authentication header set to token type "Bearer" and the token itself.
     */
    let options = {}

    //if(token) options = { headers: { Authorization: token } }; // Conditional: if "token" is not "undefined"

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
        
        const request = await fetch(url, options);

        if(request.ok) return await request.json();
        
        else throw request;

    } catch (error) {
        
        return error;

    };
    
};