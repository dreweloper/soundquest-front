import { useDispatch, useSelector } from "react-redux";
import { setDislike, setLike } from "../store/slices";
import { useFetchMongoDB } from "./useFetchMongoDB";
import { setIconFill } from "../helpers";

/**
 * Custom hook that handles everything related to the Redux 'like' state.
 * @function useLikeStore
 * @returns {Function}
 */
export const useLikeStore = () => {

    // REDUX HOOKS
    const dispatch = useDispatch();

    const { like } = useSelector(state => state.like);

    // CUSTOM HOOKS
    const { addTrack, deleteTrack } = useFetchMongoDB();

    
    /**
     * The function handles the 'onClick' event in the 'favorite' button in Card component.
     * @function handleLike
     */
    const handleLike = () => {

        if (!like) {

            dispatch(setLike()); // Changes the 'like' state's value to 'true'.

            addTrack(); // Adds the track to MongoDB.

            setIconFill(1); // Changes the icon 'favorite' fill's value to '1'.

        } else {

            dispatch(setDislike()); // Changes the 'like' state's value to 'false'.

            deleteTrack(); // Removes the track from MongoDB.

            setIconFill(0); // Changes the icon 'favorite' fill's value to '0'.

        };

    };


    return { handleLike };

};