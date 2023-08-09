import { fetchMongoDB } from "../api";

/**
 * Custom hook to interact with the MongoDB API in SoundQuest.
 * This hook provides functions to fetch, add, and delete tracks from the "tracks" collection in the MongoDB "soundquest" database. It utilizes the fetchMongoDB function from the "api" module.
 * 
 * @function useFetchMongoDB
 * @returns {Object} An object containing the following functions:
 * - getTracks: Fetches all documents in the "tracks" collection from the MongoDB API.
 * - getTrackByID: Fetches a specific track document by its ID from the MongoDB API.
 * - addTrack: Adds a new track document to the "tracks" collection in the MongoDB API.
 * - deleteTrack: Deletes a track document by its ID from the "tracks" collection in the MongoDB API.
 */
export const useFetchMongoDB = () => {

    //! pending: error handling
    const getTracks = async () => {

        /**
         * The URL of the MongoDB API endpoint to fetch all tracks.
         * @type {String}
         */
        const url = 'https://soundquest-xf5r.onrender.com/api/v1/tracks';


        try {

            /**
             * The request object received from the fetchMongoDB function.
             * @type {Object}
             */
            const request = await fetchMongoDB(url, 'GET');

            if (request.ok) console.log('Wake up, Render!');

        } catch (error) {

            console.log(error);

        };

    }; //GETTRACK



    return {
        getTracks
    };

};