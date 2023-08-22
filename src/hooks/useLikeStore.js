import { useDispatch, useSelector } from "react-redux";
import { closeLikeSnackBar, setDislike, setLike, setLikeError, updateLikesCounter } from "../store/slices";
import { dispatchWithDelay, setIconFill } from "../helpers";
import { useState } from "react";
import { fetchMongoDB } from "../api";

export const useLikeStore = () => {

    // REACT HOOK - State for managing the ID of a MongoDB document.
    const [objectID, setObjectID] = useState(undefined);

    // REDUX HOOKS
    /**
     * The 'host' state object from Redux store.
     * @type {Object}
     */
    const { host } = useSelector(state => state.host);
    /**
     * The 'playlist' state object from Redux store.
     * @type {Object}
     */
    const { playlist } = useSelector(state => state.playlist);
    /**
     * The 'track' state object from Redux store.
     * @type {Object}
     */
    const { track } = useSelector(state => state.track);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // VARIABLES
    /***
     * The URL base of the MongoDB API endpoint.
     * @type {String}
     */
    const urlBase = 'https://soundquest-xf5r.onrender.com/api/v1';

    // FUNCTIONS
    /**
     * Fetches the count of tracks from the server and updates the likes counter.
     * @async
     * @function getTracksCount
     * @returns {Promise<void>}
     */
    const getTracksCount = async () => {

        try {

            /**
             * Fetches the count of tracks from the MongoDB server using a GET request.
             * @function
             * @async
             * @param {String} url - The URL to fetch data from.
             * @param {String} method - The HTTP method for the request ('GET').
             * @returns {Promise<Object>} The response data from the server.
             */
            const response = await fetchMongoDB(`${urlBase}/tracks/counter`, 'GET');

            if (response.ok) {
                /**
                 * The updated count of likes
                 * @type {Number}
                 */
                const count = response.data;
                /**
                 * Dispatches an action to update the likes counter.
                 * @function
                 * @param {Number} count - The updated count of likes.
                 * @returns {void}
                 */
                dispatch(updateLikesCounter(count));

            };

        } catch (error) {

            console.log(error);

        };

    }; //!GETTRACKSCOUNT

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
        const body = { host, playlist, track };

        try {
            /**
             * The response received from the MongoDB API.
             * @type {Object}
             */
            const response = await fetchMongoDB(`${urlBase}/tracks`, 'POST', body);

            if (response.ok) {
                /**
                 * The ID of the newly added track document.
                 * @type {String}
                 */
                const { _id } = response.data;

                setObjectID(_id);

                dispatch(setLike());

                setIconFill(1);

                getTracksCount();

            };

        } catch (error) {

            dispatch(setLikeError()); //! Habría que renderizar mensaje de error en el SnackBar

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
            const response = await fetchMongoDB(`${urlBase}/track/${objectID}`, 'DELETE');

            if (response.ok) {

                dispatch(setDislike());

                setIconFill(0);

                setObjectID(undefined);

                getTracksCount();

            };

        } catch (error) {

            dispatch(setLikeError());

        };

    }; //!DELETETRACK


    return {
        getTracksCount,
        addTrack,
        deleteTrack
    };

};