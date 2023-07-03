import { useDispatch, useSelector } from "react-redux";
import { setPlaylistID, setToken, setTrack, setTrackID, startLoading } from '../store/slices';
import { fetchAPI } from "../api/fetchAPI";
import { getCookie, setCookie } from "../helpers/cookies";

const urlBase = 'https://soundquest-xf5r.onrender.com/api/v1/spotify';


export const useSpotifyStore = () => {

    const { token } = useSelector(state => state.spotify);

    const { token_type, access_token } = token; // Destructuring of the properties "token_type" and "access_token" of state's object "token".

    const dispatch = useDispatch();


    const getToken = async () => {

        const url = `${urlBase}/token`;

        dispatch(startLoading());


        try {

            const cookieToken = getCookie('token');

            if(cookieToken){ // Conditional: if "cookieToken" is not undefined.

                const { token_type, access_token } = cookieToken; // Destructuring of the properties "token_type" and "access_token" of "cookieToken" object.

                return dispatch(setToken({ token_type, access_token }));

            };

            const response = await fetchAPI(url); // If "cookieToken" is undefined (because cookieToken doesn't exist or expired)
            
            if(response.ok){

                const { token_type, access_token } = response.data; // Destructuring of the properties "token_type" and "access_token" of "response.data" object.

                dispatch(setToken({ token_type, access_token }));

                setCookie('token', response.data);

            } else {

                throw response; 

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETTOKEN


    const getPlaylistID = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/user-playlists/${id}`;


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

    }; //!GETPLAYLISTID


    const getTrackID = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/playlist/${id}`;

        
        try {
            
            const response = await fetchAPI(url, authorization);

            if(response.ok){

                const { track_id } = response;

                dispatch(setTrackID({ track_id }));

            } else {

                throw response;

            };

        } catch (error) {

            console.log(error);
            
        };

    }; //!GETTRACKID


    const getTrack = async (id) => {

        const authorization = `${token_type} ${access_token}`;

        const url = `${urlBase}/track/${id}`;


        try {
            
            const response = await fetchAPI(url, authorization);

            if(response.ok){

                const { track } = response;

                const { album, image, artist, name, url } = track;

                dispatch(setTrack({ album, image, artist, name, url }));

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!GETCHTRACK


    return {
        getToken,
        getPlaylistID,
        getTrackID,
        getTrack
    };

};