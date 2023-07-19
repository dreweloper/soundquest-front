import { useSelector } from "react-redux";
import { fetchMongoDB } from "../api";

export const useFetch = () => {

    const playlist = useSelector(state => state.playlist);

    const track = useSelector(state => state.track);


    const addTrack = async () => {

        const url = 'https://soundquest-xf5r.onrender.com/api/v1/tracks';

        const body = { playlist, track };


        try {
            
            const response = await fetchMongoDB(url, 'POST', body);

            if(response.ok){

                console.log(response);

                // Aquí se podría hacer la llamada al GET para actualizar el length de la collection en la base de datos, por ejemplo.

                // Se podría hacer un "return" de un estado "OK", por ej., para disabled del botón o cambiar el icon.

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };
        
    };


    return { addTrack };

};