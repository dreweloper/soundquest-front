import { useSelector } from 'react-redux';
import { useFetch, useSpotifyStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components/Card';

export const HomePage = () => {

    const handleToken = () => getToken();

    const {
        token,
        playlist,
        track,
        isLoading
    } = useSelector(state => state.spotify);

    const {
        getToken,
        getPlaylistID,
        getTrackID,
        getTrack
    } = useSpotifyStore();

    const { addTrack } = useFetch();


    useEffect(() => {

        token.access_token && getPlaylistID('aleon88');

    }, [token]);


    useEffect(() => {

        playlist.playlist_id && getTrackID(playlist.playlist_id);

    }, [playlist.playlist_id]);


    useEffect(() => {

        track.track_id && getTrack(track.track_id);

    }, [track.track_id]);


    useEffect(() => {

        track.album && addTrack();

    }, [track.album]);


    return (

        <>

            <header className='headerHome'>

                <h1> SoundQuest </h1>

            </header>

            <main className='mainHome'>

                <section className='discoverMusic'>

                    {
                        !isLoading ? (

                            <button onClick={handleToken}> Discover new music </button>

                        ) : (

                            <div className='spinner'></div>

                        )
                    }

                </section>

                {track.album && <Card track={track} />}

            </main>

        </>

    );

};