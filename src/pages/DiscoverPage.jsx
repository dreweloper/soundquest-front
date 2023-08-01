import { useSelector } from 'react-redux';
import { usePlaylistStore, useResetStates, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';
import { NavBar } from '../layouts';

export const DiscoverPage = () => {

    // REDUX STATES
    const { isLoading } = useSelector(state => state.loading);

    const { error } = useSelector(state => state.errors);

    const token = useSelector(state => state.token);

    const { playlist_id } = useSelector(state => state.playlist); // Destructuring of the property 'playlist_id' of 'playlist' state object.

    const { track_id, isTrackStateComplete } = useSelector(state => state.track); // Destructuring of the properties 'track_id' and 'isTrackStateComplete' of 'track' state object.


    // REDUX MIDDLEWARES (HOOKS)
    const { getToken } = useTokenStore();

    const { getUserPlaylists } = usePlaylistStore();

    const { getPlaylist, getTrack } = useTrackStore();


    // CUSTOM HOOKS
    const { resetStates } = useResetStates();


    // EVENTS
    const handleToken = () => {

        //! No hace falta si el componente se renderiza nuevamente (en este caso, por la condicional del spinner)
        //token.access_token && setIconFill(0); // Avoid pre-rendering Card error: it works if 'access_token' property of 'token' state isn't 'undefined'.

        resetStates();

        getToken();

    };


    // USEEFFECTS
    useEffect(() => {

        token.access_token && getUserPlaylists('aleon88');

    }, [token]);


    useEffect(() => {

        playlist_id && getPlaylist(playlist_id); // If 'playlist_id' is not 'undefined'.

    }, [playlist_id]);


    useEffect(() => {

        track_id && getTrack(track_id); // If 'track_id' isn't 'undefined'.

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
                    isLoading && (
                        <div className='spinnerContainer'>

                            <span className='spinner'></span>

                        </div>
                    )
                }

                {
                    !isLoading && error && (
                        <div className='errorContainer'>

                            <p> Oops! <span role="img" aria-label="Face with a wide smile, squinting eyes and a bead of sweat.">😅</span> Try again, please… </p>

                        </div>
                    )
                }

                {
                    !isLoading && !error && (isTrackStateComplete && <Card />)
                }

            </main>

        </>

    );

};