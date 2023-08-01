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

        /**
         * The result of the HTTP request sent to the MongoDB API.
         * @type {Response}
         */
        const request = await fetch(url, options);

        /**
         * Checks if the HTTP request is successful and returns the JSON data from the response.
         *
         * @param {Response} request - The response object from the HTTP request.
         * @returns {Promise<Object>} A Promise that resolves to an object representing the JSON data received from the response.
         */
        if (request.ok) return await request.json();

        else throw new Error(`HTTP request failed with status: ${request.status}`);

    } catch (error) {

        throw new Error(`Error occurred during the HTTP request: ${error.message}`);

    };

};