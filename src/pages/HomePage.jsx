import { useSelector } from 'react-redux';
import { useSpotifyStore } from "../hooks";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {

    const {
        token,
        playlist_id,
        track_id,
        track,
        isLoading } = useSelector(state => state.spotify);

    const {
        fetchToken,
        fetchPlaylistID,
        fetchTrackID,
        fetchTrack
    } = useSpotifyStore();


    const handleToken = () => fetchToken();


    useEffect(() => {

        token.access_token && fetchPlaylistID('aleon88');

    }, [token]);


    useEffect(() => {

        playlist_id && fetchTrackID(playlist_id);

    }, [playlist_id]);


    useEffect(() => {

        track_id && fetchTrack(track_id);

    }, [track_id]);


    return (

        <>

            <h1> SoundQuest </h1>

            <button
                onClick={handleToken}
            >
                Generate token!
            </button>
            
            <span> {isLoading && 'Loading…'} </span>

            <p> { token.access_token && (JSON.stringify(token)) } </p>

            <p> { playlist_id && `playlist_id: ${playlist_id}` } </p>

            <p> { track_id && `track_id: ${track_id}` } </p>

            <p> { track.album && JSON.stringify(track) } </p>

            { track.album && <Link to={track.url}> Open Spotify! </Link>}

        </>

    );
    
};