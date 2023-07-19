import { useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
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



    useEffect(() => {

        token.access_token && getUserPlaylists('aleon88');

    }, [token]);


    useEffect(() => {

        playlist_id && getPlaylist(playlist_id);

    }, [playlist_id]);


    useEffect(() => {

        track_id && getTrack(track_id);

    }, [track_id]);
    


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

            <footer className='footerDiscover'>

                <div className='spotifyLogo'>

                    <img className='logoS' src="/assets/spotify/icons/Spotify_Icon_RGB_Green.png" alt="Spotify logo" title='Spotify logo' />

                    <img className='logoXL' src="/assets/spotify/logos/Spotify_Logo_RGB_Green.png" alt="Spotify logo" title='Spotify logo' />

                </div>

            </footer>

        </>

    );

};