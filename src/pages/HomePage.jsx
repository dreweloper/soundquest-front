import { useSelector } from 'react-redux';
import { useSpotifyStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components/Card';
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

            <header className='headerHome'>

                <h1> SoundQuest </h1>

                {
                    !isLoading ? (

                        <button onClick={handleToken}> Discover new music </button>

                    ) : (

                        <div className='spinner'></div>

                    )
                }

            </header>

            <main className='mainHome'>

                {

                    track.album &&

                    <>

                        <Card track={track} />

                        <section>

                            <Link to={track.url} className='spotifyLink'>

                                <img src='/assets/spotify/icons/Spotify_Icon_RGB_Black.png' alt="Spotify logo" title='Spotify logo' />

                                Play now

                            </Link>

                        </section>

                    </>

                }

            </main>

        </>

    );

};