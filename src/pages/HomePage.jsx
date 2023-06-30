import { useSelector } from 'react-redux';
import { useSpotifyStore } from "../hooks";
import { useEffect } from 'react';

export const HomePage = () => {

    const { token, playlist_id, isLoading } = useSelector(state => state.spotify);

    const { fetchToken, fetchPlaylistID } = useSpotifyStore();


    const handleToken = () => {

        fetchToken();

    };

    useEffect(() => {

        token.access_token && fetchPlaylistID();

    }, [token]);


    return (

        <>

            <h1> SoundQuest </h1>

            <button
                onClick={handleToken}
            >
                Generate token!
            </button>

            <p> { token.access_token && (JSON.stringify(token)) } </p>

            <p> { playlist_id && `playlist_id: ${playlist_id}` } </p>

        </>

    );
    
};