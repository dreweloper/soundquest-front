import { useEffect, useState } from "react";
import { fetchAPI } from "../api/fetchAPI";

export const HomePage = () => {

    const [datos, setDatos] = useState()


    useEffect(() => {

        const fetch = async () => {

            const token = await fetchAPI('https://soundquest-xf5r.onrender.com/api/v1/token');

            setDatos(token);

        };

        fetch();

    }, []);


    return (

        <>

            <h1> SoundQuest </h1>

            <p> {JSON.stringify(datos)} </p>

        </>

    );
};