import { useSelector } from 'react-redux';
import { useFetch, usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';
import { Link } from 'react-router-dom';

export const DiscoverPage = () => {

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

            <header className='headerDiscover'>

                <Link to='/'>

                    <span className="material-symbols-rounded">
                        equalizer
                    </span>

                    SoundQuest

                </Link>

            </header>

            <main className='mainDiscover'>

                <section className='discoverMusic'>

                    {
                        !isLoading ? (

                            <button onClick={handleToken}>

                                <span className="material-symbols-rounded">
                                    shuffle
                                </span>

                            </button>

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