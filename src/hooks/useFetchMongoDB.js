import { useSelector } from "react-redux";
import { fetchMongoDB } from "../api";
import { useState } from "react";

export const useFetchMongoDB = () => {

    const [objectID, setObjectID] = useState(undefined); // MongoDB document ID.


    const playlist = useSelector(state => state.playlist);

    const track = useSelector(state => state.track);


    const addTrack = async () => {

        const url = 'https://soundquest-xf5r.onrender.com/api/v1/tracks';

        const body = { playlist, track };


        try {
            
            const response = await fetchMongoDB(url, 'POST', body);

            if(response.ok){

                const { _id } = response.data;

                setObjectID(_id);

                // Aquí se podría hacer la llamada al GET para actualizar el length de la collection en la base de datos, por ejemplo.

                // Se podría hacer un "return" de un estado "OK", por ej., para disabled del botón o cambiar el icon.

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };
        
    }; //!ADDTRACK


    const deleteTrack = async () => {

        const url = `https://soundquest-xf5r.onrender.com/api/v1/tracks/${objectID}`;


        try {
            
            const request = await fetchMongoDB(url, 'DELETE');

            if(request.ok){

                console.log(request);

            } else {

                throw request;

            };
            
        } catch (error) {
            
            console.log(error);

        };

    }; //!DELETETRACK


    return {
        addTrack,
        deleteTrack
    };

};