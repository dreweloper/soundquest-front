/**
 * To make requests to an API.
 * @function fetchAPI
 * @async
 * @param {String} url API endpoint.
 * @param {String} token Authentication header Bearer token.
 * @returns {Promise} A request object at first and a JSON response body at last.
 */
export const fetchAPI = async (url, token) => {

    /**
     * @typedef {Object} options
     * @property {String} [headers] Authentication header set to token type "Bearer" and the token itself.
     */
    let options = {}

    if(token) options = { headers: { Authorization: token } }; // Conditional: if "token" is not "undefined"


    try {
        
        const request = await fetch(url, options);

        const response = await request.json();

        if(response.ok) return response;
        
        else throw response;

    } catch (error) {
        
        return error;

    };
    
};