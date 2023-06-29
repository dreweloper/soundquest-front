/**
 * To make requests to an API.
 * @function fetchAPI
 * @async
 * @param {String} url API endpoint.
 * @returns {Promise} A request object at first and a JSON response body at last.
 */
export const fetchAPI = async (url) => {


    try {
        
        const request = await fetch(url);

        const response = await request.json();

        if(response.ok) return response;
        
        else throw response;

    } catch (error) {
        
        return error;

    };
};