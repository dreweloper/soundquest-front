import { useDispatch, useSelector } from "react-redux";
import { setDislike, setLike } from "../store/slices";
import { useFetchMongoDB } from "./useFetchMongoDB";
import { setIconFill } from "../helpers";

/**
 * Custom hook that handles everything related to the Redux 'like' state.
 * This hook provides a function 'handleLike' to handle the 'onClick' event in the 'favorite' button in the Card component. It updates the 'like' state in Redux, adds or removes the track to/from MongoDB using the 'useFetchMongoDB' hook, and changes the 'favorite' icon's fill value using the 'setIconFill' helper function.
 *
 * @function useLikeStore
 * @returns {Object} An object containing the following function:
 * - handleLike: A function that toggles the 'like' state value, adds/removes the track to/from MongoDB, and changes the 'favorite' icon's fill value.
 */
export const useLikeStore = () => {

    // REDUX HOOKS
    /**
     * The 'like' state value from Redux store.
     * @type {Boolean}
     */
    const { like } = useSelector(state => state.like);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    // CUSTOM HOOKS
    /**
     * The object containing 'addTrack' and 'deleteTrack' functions from the 'useFetchMongoDB' custom hook.
     * @type {Object}
     */
    const { addTrack, deleteTrack } = useFetchMongoDB();

    
    /**
     * The function handles the 'onClick' event in the 'favorite' button in the Card component.
     * @function handleLike
     * @returns {void}
     */
    const handleLike = () => {

        if (!like) {

            dispatch(setLike()); // Changes the 'like' state's value to 'true'

            addTrack(); // Adds the track to MongoDB

            setIconFill(1); // Changes the icon 'favorite' fill's value to '1'

        } else {

            dispatch(setDislike()); // Changes the 'like' state's value to 'false'

            deleteTrack(); // Removes the track from MongoDB

            setIconFill(0); // Changes the icon 'favorite' fill's value to '0'

        };

    };


    return { handleLike };

};