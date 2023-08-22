import { useSelector } from 'react-redux';
import { usePlaylistStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect, useState } from 'react';
import { Card, Error, HostActions, InfoBox, SkeletonLoader, SnackBar } from '../components';
import { Footer, NavBar } from '../layouts';

export const ResultsPage = () => {

    // REDUX HOOKS
    const { isLoading } = useSelector(state => state.loading);
    const { playlist: { playlist_id }, isPlaylistDone } = useSelector(state => state.playlist);
    const { isTokenDone } = useSelector(state => state.token);
    const { track: { track_id }, isTrackIdDone } = useSelector(state => state.track);
    const { error } = useSelector(state => state.errors);
    const { host: { username } } = useSelector(state => state.host);
    const { isLikeSnackBarOpen } = useSelector(state => state.like);

    // REDUX MIDDLEWARES (CUSTOM HOOKS)
    const { getToken } = useTokenStore();
    const { getUserPlaylists } = usePlaylistStore();
    const { getPlaylist, getTrack } = useTrackStore();

    // REACT HOOKS
    const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

    useEffect(() => {

        getToken();

    }, []);

    useEffect(() => {
        // If the 'token' object's state has been completed.
        if (isTokenDone) getUserPlaylists(username);

    }, [isTokenDone]);

    useEffect(() => {
        // If the 'playlist' object's state has been completed.
        if (isPlaylistDone) getPlaylist(playlist_id);

    }, [isPlaylistDone]);

    useEffect(() => {
        // If the 'track_id' property within the 'track' state has been completed.
        if (isTrackIdDone) getTrack(track_id);

    }, [isTrackIdDone]);



    return (

        <>

            <NavBar isInfoBoxOpen={isInfoBoxOpen} setIsInfoBoxOpen={setIsInfoBoxOpen} />

            <main className='main-results fade-in-transition'>

                {
                    isInfoBoxOpen && (<InfoBox isInfoBoxOpen={isInfoBoxOpen} setIsInfoBoxOpen={setIsInfoBoxOpen} />)
                }

                <HostActions />

                {
                    isLoading && (<SkeletonLoader />)
                }

                {
                    !isLoading && error && (<Error />)
                }

                {
                    !isLoading && !error && (<Card />)
                }

                {
                    isLikeSnackBarOpen && (<SnackBar />)
                }

            </main >

            <Footer />

        </>

    );

};