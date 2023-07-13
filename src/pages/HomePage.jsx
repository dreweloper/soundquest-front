import { useSelector } from 'react-redux';
import { useFetch, usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';

export const HomePage = () => {

    // LOADING
    const { isLoading } = useSelector(state => state.loading);
    

    // TOKEN
    const token = useSelector(state => state.token);

    const { getToken } = useTokenStore();

    const handleToken = () => getToken();


    // PLAYLIST
    const { playlist_id } = useSelector(state => state.playlist); // Destructuring of the property 'playlist_id' of 'playlist' state object.

    const { getUserPlaylists } = usePlaylistStore();


    // TRACK
    const { track_id, track_url } = useSelector(state => state.track); // Destructuring of the properties 'track_id' and 'track_url' of 'track' state object.

    const { getPlaylist, getTrack } = useTrackStore();


    // MONGODB
    const { addTrack } = useFetch();


    useEffect(() => {

        token.access_token && getUserPlaylists('aleon88');

    }, [token]);


    useEffect(() => {

        playlist_id && getPlaylist(playlist_id);

    }, [playlist_id]);


    useEffect(() => {

        track_id && getTrack(track_id);

    }, [track_id]);


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

                {track_url && <Card />}

            </main>

        </>

    );

};