/**
 * @function fetchMongoDB
 * @async
 * @param {String} url 
 * @param {String} method 
 * @param {Object} body 
 * @returns {Promise}
 */
export const fetchMongoDB = async (url, method, body = {}) => {

    let options = {};


    if (method == 'POST') {

        const data = { ...body };

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

        const request = await fetch(url, options);

        if (request.ok) return await request.json(); // Returns an object with properties 'ok' ('true') and 'data' (array of objects).

        else throw request;

    } catch (error) {

        return error;

    };

};