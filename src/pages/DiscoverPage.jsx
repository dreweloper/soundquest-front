import { useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';
import { setIconFill } from '../helpers';
import { Footer, NavBar } from '../layouts';

export const DiscoverPage = () => {

    // LOADING
    const { isLoading } = useSelector(state => state.loading);


    // TOKEN
    const token = useSelector(state => state.token);

    const { getToken } = useTokenStore();

    const handleToken = () => {

        token.access_token && setIconFill(0); // Avoid pre-rendering Card error.

        getToken();

    };


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

        if(track_id){

            setTimeout(() => {

                getTrack(track_id);

            }, 1000);
        };

    }, [track_id]);



    return (

        <>

            <NavBar />

            <main className='mainDiscover'>

                <header className='headerDiscover'>

                    <button onClick={handleToken}>

                        <span className='randomTrack'>Random track</span>

                        {
                            !isLoading ? (
                                <span className="material-symbols-rounded">
                                    shuffle
                                </span>
                            ) : (
                                <div className='spinner'></div>
                            )
                        }

                    </button>

                </header>

                {track_url && <Card />}

                {/* <section className='discoverMusic'>

                    {
                        !isLoading ? (

                            <button onClick={handleToken}>

                                <span>Random track</span>

                                <span className="material-symbols-rounded">
                                    shuffle
                                </span>

                            </button>

                        ) : (

                            <div className='spinner'></div>

                        )
                    }

                </section>

                {track_url && <Card />} */}

            </main>

            {/* <Footer /> */}

        </>

    );

};