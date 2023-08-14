import { useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card, Error } from '../components';
import { Footer, NavBar } from '../layouts';

export const ResultsPage = () => {

    // REDUX HOOKS
    const { error } = useSelector(state => state.errors);
    const { host: { username } } = useSelector(state => state.host);
    const { isLoading } = useSelector(state => state.loading);
    const { playlist: { playlist_id }, isPlaylistDone } = useSelector(state => state.playlist);
    const { isTokenDone } = useSelector(state => state.token);
    const { track: { track_id }, isTrackIdDone, isTrackDone } = useSelector(state => state.track);

    // REDUX MIDDLEWARES (CUSTOM HOOKS)
    const { getToken } = useTokenStore();
    const { getUserPlaylists } = usePlaylistStore();
    const { getPlaylist, getTrack } = useTrackStore();


    // USEEFFECTS
    useEffect(() => {

        getToken();
    
    }, []);

    useEffect(() => {

        if(isTokenDone) getUserPlaylists(username); // If 'access_token' isn't 'undefined'.

    }, [isTokenDone]);


    useEffect(() => {

        if(isPlaylistDone) getPlaylist(playlist_id); // If 'playlist_id' isn't 'undefined'.

    }, [isPlaylistDone]);


    useEffect(() => {

        if(isTrackIdDone) getTrack(track_id); // If 'track_id' isn't 'undefined'.

    }, [isTrackIdDone]); // If I only specify 'track', it triggers twice due to the state change caused by the previous `useEffect` with the `setTrackID` dispatch from the `getPlaylist` function of the `useTrackStore` hook.



    return (

        <>

            <NavBar />

            <main className='main-results fade-in-transition'>

                {/* {
                    !isLoading && !access_token && (!error &&

                        <button
                            className='shuffle-button'
                            onClick={getToken}
                        >

                            <span className="material-symbols-rounded">
                                shuffle
                            </span>

                        </button>

                    )
                } */}

                {
                    isLoading && (<span className='spinner'></span>)
                }

                {
                    !isLoading && error && (<Error />)
                }

                {
                    !isLoading && !error && (isTrackDone && <Card />)
                }

            </main >

            <Footer />

        </>

    );

};