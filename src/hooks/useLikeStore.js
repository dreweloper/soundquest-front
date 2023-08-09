import { useDispatch, useSelector } from "react-redux";
import { setDislike, setLike, setLikeError } from "../store/slices";
import { setIconFill } from "../helpers";
import { useState } from "react";
import { fetchMongoDB } from "../api";

export const useLikeStore = () => {

    /***
     * The URL base of the MongoDB API endpoint.
     * @type {String}
     */
    const urlBase = 'https://soundquest-xf5r.onrender.com';

    // REACT HOOKS
    // State for managing the ID of a MongoDB document.
    const [objectID, setObjectID] = useState(undefined);

    // REDUX HOOKS
    /**
     * The 'playlist' state object from Redux store.
     * @type {Object}
     */
    const playlist = useSelector(state => state.playlist);
    /**
     * The 'track' state object from Redux store.
     * @type {Object}
     */
    const track = useSelector(state => state.track);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();


    /**
     * Adds a track to the MongoDB API.
     * @async
     * @function addTrack
     * @returns {void}
     * @throws {Error} Throws an error if there is a problem adding the track.
     */
    const addTrack = async () => {

        /**
         * Data to be sent in the request body.
         * @type {Object}
         * @property {Object} playlist - The playlist object to be added.
         * @property {Object} track - The track object to be added.
         */
        const body = { playlist, track };

        try {

            /**
             * The response received from the MongoDB API.
             * @type {Object}
             */
            const response = await fetchMongoDB(`${urlBase}/api/v1/tracks`, 'POST', body);

            if (response.ok) {

                /**
                 * The ID of the newly added track document.
                 * @type {String}
                 */
                const { _id } = response.data;

                setObjectID(_id);

                dispatch(setLike());

                setIconFill(1);

            };

        } catch (error) {

            dispatch(setLikeError());

        };

    }; //!ADDTRACK

    /**
     * Deletes a track from the MongoDB API.
     * @async
     * @function deleteTrack
     * @returns {void}
     * @throws {Error} Throws an error if there is a problem adding the track.
     */
    const deleteTrack = async () => {

        try {
            
            /**
             * The response received from the MongoDB API.
             * @type {Object}
             */
            const response = await fetchMongoDB(`${urlBase}/api/v1/tracks/${objectID}`, 'DELETE');

            if(response.ok){

                setObjectID(undefined);

                dispatch(setDislike());

                setIconFill(0);

            };

        } catch (error) {

            dispatch(setLikeError());
            
        };

    }; //!DELETETRACK


    return {
        addTrack,
        deleteTrack
    };

};