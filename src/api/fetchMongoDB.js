/**
 * Performs an HTTP request to a MongoDB API endpoint.
 * 
 * @async
 * @function fetchMongoDB
 * @param {String} url - The URL of the MongoDB API endpoint.
 * @param {String} method - The HTTP method to be used in the request ('POST' or 'DELETE' –optional, default is 'GET').
 * @param {Object} [body={}] - The request body data to be sent in the 'POST' request (optional, default is an empty object).
 * @returns {Promise<Object|Error>} A Promise that resolves to an object with properties 'ok' ('true') and 'data' (array of objects) if the request is successful. Otherwise, it resolves to an Error object representing the error occurred during the request.
 */
export const fetchMongoDB = async (url, method, body = {}) => {

    /**
     * The options object used for the HTTP request.
     * @typedef {Object} FetchOptions
     * @property {String} method - The HTTP method for the request ('POST' or 'DELETE').
     * @property {String} [body] - The request body data as a JSON string (only present in 'POST' requests, default is an empty object).
     * @property {String} mode - The request mode ('cors' indicates a cross-origin request).
     * @property {String} cache - The cache mode for the request ('force-cache' indicates to force caching of the request).
     * @property {Object} headers - An object containing request headers.
     * @property {String} headers ['Content-Type'] - The value for the 'Content-Type' header, specifying that the request body is in JSON format.
     */
    let options = {};

    if (method == 'POST') {
        /**
         * The data object created by spreading the contents of the 'body' object.
         * @type {Object}
         */
        const data = { ...body };
        /**
         * @type {FetchOptions}
         */
        options = {
            method,
            body: JSON.stringify(data),
            mode: 'cors',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    };

    if (method == 'DELETE') options = { method };


    try {

        const response = await fetch(url, options);

        if (response.ok) {

            return await response.json();

        } else {

            throw {
                ok: false,
                status: response.status
            };

        };

    } catch (error) {

        return error;

    };

};