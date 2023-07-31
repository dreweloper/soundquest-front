import { useDispatch, useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';
import { setIconFill } from '../helpers';
import { Footer, NavBar } from '../layouts';
import { clearPlaylist, clearTrack } from '../store/slices';

export const DiscoverPage = () => {

    const dispatch = useDispatch();

    
    // LOADING
    const { isLoading } = useSelector(state => state.loading);


    // TOKEN
    const token = useSelector(state => state.token);

    const { getToken } = useTokenStore();

    const handleToken = () => {

        token.access_token && setIconFill(0); // Avoid pre-rendering Card error: it works if 'access_token' property of 'token' state isn't 'undefined'.

        dispatch(clearPlaylist()); // Avoid infinite loading because of 'playlist_id' property doesn't change and useEffect doesn't work.

        dispatch(clearTrack()); // Avoid infinite loading because of 'track_id' property doesn't change and useEffect doesn't work.

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

        playlist_id && getPlaylist(playlist_id); // If 'playlist_id' is not undefined.

    }, [playlist_id]);


    useEffect(() => {

        track_id && getTrack(track_id);

    }, [track_id]);



    return (

        <>

            <NavBar />

            <main className='mainDiscover'>

                <header className='headerDiscover'>

                    <button
                        className='shuffleButton'
                        onClick={handleToken}
                        disabled={isLoading}
                    >

                        <span className='shuffleButtonText'>Random track</span>

                        {
                            !isLoading ? (
                                <span className="material-symbols-rounded">
                                    shuffle
                                </span>
                            ) : (
                                <span className='spinner'></span>
                            )
                        }

                    </button>

                </header>

                {
                    isLoading ? (
                        <div className='spinnerContainer'>

                            <span className='spinner'></span>
                            
                        </div>
                    ) : (
                        track_url && <Card />
                    )
                }

            </main>

            {/* <Footer /> */}

        </>

    );

};