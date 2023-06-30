import { useSelector } from 'react-redux';
import { useSpotifyStore } from "../hooks";
import { useEffect } from 'react';

export const HomePage = () => {

    const {
        token,
        playlist_id,
        track_id,
        isLoading } = useSelector(state => state.spotify);

    const {
        fetchToken,
        fetchPlaylistID,
        fetchTrackID
    } = useSpotifyStore();


    const handleToken = () => fetchToken();


    useEffect(() => {

        token.access_token && fetchPlaylistID('aleon88');

    }, [token]);


    useEffect(() => {

        playlist_id && fetchTrackID(playlist_id);

    }, [playlist_id]);


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

            <p> { track_id && `track_id: ${track_id}` } </p>

        </>

    );
    
};