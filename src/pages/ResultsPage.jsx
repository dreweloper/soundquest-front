import { useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card, Error } from '../components';
import { Footer, NavBar } from '../layouts';

export const ResultsPage = () => {

    // REDUX HOOKS
    const { isLoading } = useSelector(state => state.loading);
    const { playlist: { playlist_id }, isPlaylistDone } = useSelector(state => state.playlist);
    const { isTokenDone } = useSelector(state => state.token);
    const { track: { track_id }, isTrackIdDone } = useSelector(state => state.track);
    const { error } = useSelector(state => state.errors);
    const { host: { username }} = useSelector(state => state.host);

    // REDUX MIDDLEWARES (CUSTOM HOOKS)
    const { getToken } = useTokenStore();
    const { getUserPlaylists } = usePlaylistStore();
    const { getPlaylist, getTrack } = useTrackStore();


    // USEEFFECTS
    useEffect(() => {

        getToken();
    
    }, []);

    useEffect(() => {
        // If the 'token' object's state has been completed.
        if(isTokenDone) getUserPlaylists(username);

    }, [isTokenDone]);


    useEffect(() => {
        // If the 'playlist' object's state has been completed.
        if(isPlaylistDone) getPlaylist(playlist_id);

    }, [isPlaylistDone]);


    useEffect(() => {
        // If the 'track_id' property within the 'track' state has been completed.
        if(isTrackIdDone) getTrack(track_id);

    }, [isTrackIdDone]);



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
                    !isLoading && !error && (<Card />)
                }

            </main >

            <Footer />

        </>

    );

};