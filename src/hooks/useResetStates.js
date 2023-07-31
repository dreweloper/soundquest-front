import { useDispatch } from "react-redux";
import { clearPlaylist, clearToken, clearTrack, finishLoading, setDislike } from "../store/slices";

export const useResetStates = () => {

    const dispatch = useDispatch();


    const resetStates = () => {

        dispatch(setDislike());

        dispatch(clearToken());

        dispatch(clearPlaylist());

        dispatch(clearTrack());

        dispatch(finishLoading());

    };

    return { resetStates };

};