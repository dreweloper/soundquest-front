import { useDispatch } from "react-redux";
import { setToken, startLoading } from '../store/slices';
import { fetchAPI } from "../api/fetchAPI";

const urlBase = 'https://soundquest-xf5r.onrender.com/api/v1/spotify';


export const useSpotifyStore = () => {

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


    return { fetchToken };

};