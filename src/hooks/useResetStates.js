import { useDispatch } from "react-redux";
import { clearError, clearPlaylist, clearToken, clearTrack, finishLoading, setDislike } from "../store/slices";

export const useResetStates = () => {

    const dispatch = useDispatch();


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