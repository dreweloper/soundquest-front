import { useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';
import { Footer, NavBar } from '../layouts';

export const ResultsPage = () => {

    // REDUX STATES
    const { errors, loading, playlist, token, track } = useSelector(state => state);

    // REDUX STATES DESTRUCTURING
    const { error } = errors;
    const { isLoading } = loading;
    const { playlist_id } = playlist;
    const { access_token } = token;
    const { track_id, isTrackStateComplete } = track;

    // REDUX MIDDLEWARES (CUSTOM HOOKS)
    const { getToken } = useTokenStore();
    const { getUserPlaylists } = usePlaylistStore();
    const { getPlaylist, getTrack } = useTrackStore();


    // USEEFFECTS

    useEffect(() => {

        access_token && getUserPlaylists('aleon88'); // If 'access_token' isn't 'undefined'.

    }, [token]);


    useEffect(() => {

        playlist_id && getPlaylist(playlist_id); // If 'playlist_id' isn't 'undefined'.

    }, [playlist]);


    useEffect(() => {

        track_id && getTrack(track_id); // If 'track_id' isn't 'undefined'.

    }, [track_id]); // If I only specify 'track', it triggers twice due to the state change caused by the previous `useEffect` with the `setTrackID` dispatch from the `getPlaylist` function of the `useTrackStore` hook.



    return (

        <>

            <NavBar />

            <main className='main-results'>

                {
                    !isLoading && !access_token && (

                        <button
                            className='shuffle-button'
                            onClick={getToken}
                            // disabled={isLoading} // The button is disabled while the requests to the Spotify Web API are loading.
                        >

                            <span className="material-symbols-rounded">
                                shuffle
                            </span>

                        </button>

                    )
                }

                {
                    isLoading && (<span className='spinner'></span>)
                }

                {
                    !isLoading && error && (
                        <div className='error-container'>

                            <p>Oops! <span role="img" aria-label="Face with a wide smile, squinting eyes and a bead of sweat.">😅</span> Try again, please…</p>

                        </div>
                    )
                }

                {
                    !isLoading && !error && (isTrackStateComplete && <Card />)
                }

            </main >

            <Footer />

        </>

    );

};