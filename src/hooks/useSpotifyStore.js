import { useDispatch, useSelector } from "react-redux";
import { setPlaylistID, setToken, startLoading } from '../store/slices';
import { fetchAPI } from "../api/fetchAPI";

const urlBase = 'https://soundquest-xf5r.onrender.com/api/v1/spotify';


export const useSpotifyStore = () => {

    const { token } = useSelector(state => state.spotify);

    const { token_type, access_token } = token; // Destructuring of the properties "token_type" and "access_token" of state's object "token".

    const dispatch = useDispatch();


    const fetchToken = async () => {

        const url = `${urlBase}/token`;

        dispatch(startLoading());


        try {
            
            const response = await fetchAPI(url);

            if(response.ok){

                const { access_token } = response.data;

                dispatch(setToken({ access_token }));

            } else {

                throw response; 

            };

        } catch (error) {
            
            console.log(error);

        };

    };


    const fetchPlaylistID = async () => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/user-playlists/aleon88`;


        try {
            
            const response = await fetchAPI(url, authorization);

            if(response.ok){

                const { playlist_id } = response;

                dispatch(setPlaylistID({ playlist_id }));

            } else {

                throw response;

            }

        } catch (error) {
            
            console.log(error);

        };

    };


    return {
        fetchToken,
        fetchPlaylistID
    };

};