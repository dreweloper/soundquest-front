import { useSelector } from "react-redux";
import { fetchMongoDB } from "../api";
import { useState } from "react";

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

    // REACT HOOKS
    const [objectID, setObjectID] = useState(undefined);

    // REDUX HOOKS
    const { playlist, track } = useSelector(state => state);


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

    //! pending: error handling
    const getTrackByID = async (id) => {

        /**
         * @type {String} The URL of the MongoDB API endpoint to fetch the track by ID.
         */ 
        const url = `https://soundquest-xf5r.onrender.com/api/v1/tracks/${id}`;


        try {
            /**
             * @type {Object} The response received from the fetchMongoDB function.
             */
            const response = await fetchMongoDB(url, 'GET');

            if(response.ok){

                console.log('OK'); //! PENDING

            } else {

                /**
                 * @type {Boolean} The value representing the success of the request (false in case of failure).
                 */
                return false;

            };

        } catch (error) {

            console.log(error);

        };

    }; //GETTRACKBYID

    //! pending: error handling
    const addTrack = async () => {

        /**
         * The URL of the MongoDB API endpoint to add a new track.
         * @type {String}
         */
        const url = 'https://soundquest-xf5r.onrender.com/api/v1/tracks';

        /**
         * Data to be sent in the request body.
         * @type {Object}
         * @property {Object} playlist - The playlist object to be added.
         * @property {Object} track - The track object to be added.
         */
        const body = { playlist, track };


        try {
            /**
             * The response received from the fetchMongoDB function.
             * @type {Object}
             */
            const request = await fetchMongoDB(url, 'POST', body);

            if (request.ok) {
                /**
                 * The ID of the newly added track document.
                 * @type {string}
                 */
                const { _id } = request.data;

                setObjectID(_id);

            };

        } catch (error) {

            console.log(error);

        };

    }; //ADDTRACK

    //! pending: error handling
    const deleteTrack = async () => {

        /**
         * @type {String} Delete track MongoDB API endpoint.
         */
        const url = `https://soundquest-xf5r.onrender.com/api/v1/tracks/${objectID}`;


        try {

            const request = await fetchMongoDB(url, 'DELETE');

            if (request.ok) {

                return request;

            } else {

                throw request;

            };

        } catch (error) {

            console.log(error);

        };

    }; //DELETETRACK


    return {
        getTracks,
        getTrackByID,
        addTrack,
        deleteTrack
    };

};