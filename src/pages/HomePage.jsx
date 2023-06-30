import { useSelector } from 'react-redux';
import { useSpotifyStore } from "../hooks";

export const HomePage = () => {

    const { token, isLoading } = useSelector(state => state.spotify);

    const { fetchToken } = useSpotifyStore();


    const handleToken = () => {

        fetchToken();

    };


    return (

        <>

            <h1> SoundQuest </h1>

            <button
                onClick={handleToken}
            >
                Generate token!
            </button>

            <p> {isLoading && JSON.stringify(token)} </p>

        </>

    );
    
};