import { useDispatch } from "react-redux";
import { clearError, clearPlaylist, clearToken, clearTrack, finishLoading, setDislike } from "../store/slices";

/**
 * Custom hook that resets all Redux states.
 * This hook provides a function 'resetStates' that clears/reset all the Redux states used in the application. It dispatches actions to set the 'error', 'like', 'token', 'playlist', 'track', and 'loading' states to their initial values or clears their data.
 * 
 * @function useResetStates
 * @returns {Object} An object containing the following function:
 * - resetStates: A function that clears/reset all Redux states.
 */
export const useResetStates = () => {

    // REDUX HOOKS
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();

    /**
     * The function clears all Redux states.
     * @function resetStates
     * @returns {void}
     */
    const resetStates = () => {

        dispatch(clearError()); // Sets the 'error' state to false.

        dispatch(setDislike()); // Sets the 'like' state to false.

        dispatch(clearToken()); // Clears the 'token' state.

        dispatch(clearPlaylist()); // Clears the 'playlist' state.

        dispatch(clearTrack()); // Clears the 'track' state.

        dispatch(finishLoading()); // Sets the 'isLoading' state to false.

    };

    return { resetStates };

};