import { useSelector } from 'react-redux';
import { useFetch, useSpotifyStore, useTokenStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components/Card';

export const HomePage = () => {

    // TOKEN

    const { access_token } = useSelector(state => state.token); // Destructuring of the property 'access_token' of 'token' state's object.

    const { getToken } = useTokenStore();

    const handleToken = () => getToken();



    const {
        token,
        playlist,
        track,
        isLoading
    } = useSelector(state => state.spotify);

    const {
        // getToken,
        getPlaylistID,
        getTrackID,
        getTrack
    } = useSpotifyStore();

    const { addTrack } = useFetch();


    useEffect(() => {

        access_token && getPlaylistID('aleon88');

    }, [access_token]);


    useEffect(() => {

        playlist.playlist_id && getTrackID(playlist.playlist_id);

    }, [playlist.playlist_id]);


    useEffect(() => {

        track.track_id && getTrack(track.track_id);

    }, [track.track_id]);


    // useEffect(() => {

    //     track.album && addTrack();

    // }, [track.album]);


    return (

        <>

            <header className='headerHome'>

                <h1> SoundQuest </h1>

            </header>

            <main className='mainHome'>

                <section className='discoverMusic'>

                    {
                        !isLoading ? (

                            <button onClick={handleToken}>Discover new music</button>

                        ) : (

                            <div className='spinner'></div>

                        )
                    }

                </section>

                {track.album && <Card track={track} playlist={playlist} />}

            </main>

        </>

    );

};