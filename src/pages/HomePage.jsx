import { useSelector } from 'react-redux';
import { useFetch, usePlaylistStore, useSpotifyStore, useTokenStore, useTrackStore } from "../hooks";
import { useEffect } from 'react';
import { Card } from '../components';

export const HomePage = () => {

    // TOKEN

    const { access_token } = useSelector(state => state.token); // Destructuring of the property 'access_token' of 'token' state's object.

    const { getToken } = useTokenStore();

    const handleToken = () => getToken();


    // PLAYLIST

    const { playlist_id } = useSelector(state => state.playlist); // Destructuring of the property 'playlist_id' of 'playlist' state's object.

    const { getUserPlaylists } = usePlaylistStore();


    // TRACK

    const { track_id } = useSelector(state => state.track);

    const { getPlaylist } = useTrackStore();


    const {
        token,
        playlist,
        track,
        isLoading
    } = useSelector(state => state.spotify);

    const {
        // getToken,
        // getPlaylistID,
        // getTrackID,
        getTrack
    } = useSpotifyStore();

    const { addTrack } = useFetch();


    useEffect(() => {

        access_token && getUserPlaylists('aleon88');

    }, [access_token]);


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

                {track.album && <Card track={track} playlist={playlist} />}

            </main>

        </>

    );

};