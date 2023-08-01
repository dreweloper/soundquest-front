import { useDispatch } from "react-redux";
import { clearError, clearPlaylist, clearToken, clearTrack, finishLoading, setDislike } from "../store/slices";

/**
 * Custom hook that resets all Redux states.
 * @function useResetStates
 * @returns {Function}
 */
export const useResetStates = () => {

    // REDUX HOOKS
    const dispatch = useDispatch();

    /**
     * The function clears all Redux states.
     * @function resetStates
     */
    const resetStates = () => {

        dispatch(clearError());

        dispatch(setDislike());

        dispatch(clearToken());

        dispatch(clearPlaylist());

        dispatch(clearTrack());

        dispatch(finishLoading());

    };

    return { resetStates };

};