import { fetchMongoDB } from "../api";

export const useVisit = () => {


    const recordVisit = async () => {

        const url = 'https://soundquest-xf5r.onrender.com/api/v1/visits';

        try {
            
            const response = await fetch('https://ipapi.co/json');

            if(response.ok) {

                const location = await response.json();

                await fetchMongoDB(url, 'POST', location);

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!RECORDVISIT


    return { recordVisit };

};