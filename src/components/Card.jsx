import { Link } from 'react-router-dom';

export const Card = ({ track, playlist }) => {

    const { album, artwork, artist, name, track_url } = track;

    const { playlist_url } = playlist;


    return (

        <>

            <section className='trackContainer'>

                <div className='artwork'>

                    <img src={artwork} alt="Album cover" title="Album cover" />

                </div>

                <article className='trackInfo'>

                    <p className='song'> {name} </p>

                    <p className='artist'> {artist} </p>

                    <section className='spotifySection'>

                        <div className='spotifyLogo'>

                            <img src='/assets/spotify/icons/Spotify_Icon_RGB_Green.png' alt="Spotify logo" title='Spotify logo' />

                        </div>

                        <div className='spotifyLinks'>

                            <Link to={track_url}>

                                <span className="material-symbols-rounded">
                                    play_arrow
                                </span>

                                Play
                            </Link>

                            <Link to={playlist_url}>Open Playlist</Link>

                        </div>

                    </section>

                </article>

            </section>

        </>

    );

};