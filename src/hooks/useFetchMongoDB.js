import { useSelector } from "react-redux";
import { fetchMongoDB } from "../api";
import { useState } from "react";

export const useFetchMongoDB = () => {

    const [objectID, setObjectID] = useState(undefined); // MongoDB document's ID. It's used in 'addTrack' and 'deleteTrack'.


    const playlist = useSelector(state => state.playlist);

    const track = useSelector(state => state.track);

    /**
     * The function fetches all documents in the 'tracks' collection from the MongoDB 'soundquest' database.
     * @function getTrack
     * @async
     */
    const getTracks = async () => {

        /**
         * @type {String} Get tracks MongoDB API endpoint.
         */
        const url = 'https://soundquest-xf5r.onrender.com/api/v1/tracks';


        try {
            
            await fetchMongoDB(url, 'GET');

            console.log('Wake up, Render!');

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETTRACK

    /**
     * The function adds a new document to the "tracks" collection of the MongoDB "soundquest" database.
     * @function addTrack
     * @async
     */
    const addTrack = async () => {

        /**
         * @type {String} Add track MongoDB API endpoint.
         */
        const url = 'https://soundquest-xf5r.onrender.com/api/v1/tracks';

        /**
         * @typedef {Object} body
         * @property {Object} playlist
         * @property {Object} track
         */
        const body = { playlist, track };


        try {
            
            const response = await fetchMongoDB(url, 'POST', body);

            if(response.ok){

                const { _id } = response.data;

                setObjectID(_id);

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };
        
    }; //!ADDTRACK

    /**
     * The function deletes by ID a document from the "tracks" collection of the MongoDB "soundquest" database.
     * @function deleteTrack
     * @async
     * @returns {Object}
     */
    const deleteTrack = async () => {

        /**
         * @type {String} Delete track MongoDB API endpoint.
         */
        const url = `https://soundquest-xf5r.onrender.com/api/v1/tracks/${objectID}`;


        try {
            
            const request = await fetchMongoDB(url, 'DELETE');

            if(request.ok){

                return request;

            } else {

                throw request;

            };
            
        } catch (error) {
            
            console.log(error);

        };

    }; //!DELETETRACK


    return {
        getTracks,
        addTrack,
        deleteTrack
    };

};