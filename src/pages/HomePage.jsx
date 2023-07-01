import { useSelector } from 'react-redux';
import { useSpotifyStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components/Card';

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

            <main>

                <h1> SoundQuest </h1>

                <div>

                    <button onClick={handleToken}> Give me a random track </button>

                    {isLoading && <span> Loading… </span>}

                </div>

                {track.album && <Card track={track} />}

            </main>

        </>

    );

};