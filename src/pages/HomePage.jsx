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
        isLoading
    } = useSelector(state => state.spotify);

    const {
        getToken,
        getPlaylistID,
        getTrackID,
        getTrack
    } = useSpotifyStore();


    const handleToken = () => getToken();


    useEffect(() => {

        token.access_token && getPlaylistID('aleon88');

    }, [token]);


    useEffect(() => {

        playlist_id && getTrackID(playlist_id);

    }, [playlist_id]);


    useEffect(() => {

        track_id && getTrack(track_id);

    }, [track_id]);


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