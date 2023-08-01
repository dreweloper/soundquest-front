import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLikeStore } from '../hooks/useLikeStore';

export const Card = () => {

    // REDUX STATES
    const { playlist, track } = useSelector(state => state);

    // REDUX STATES DESTRUCTURING
    const { playlist_url } = playlist;
    const { artwork, artist, name, track_url } = track;


    // CUSTOM HOOKS - EVENT
    const { handleLike } = useLikeStore();


    return (

        <>

            <section className='cardContainer'>

                <article className='cardItem'>

                    <div className='artwork'>

                        <img src={artwork} alt="Album cover" title="Album cover" />

                    </div>

                    <section className='trackInfo'>

                        <p className='song'> {name} </p>

                        <p className='artist'> {artist} </p>

                        <button onClick={handleLike}>

                            <span id='like' className="material-symbols-rounded">
                                favorite
                            </span>

                        </button>

                    </section>

                </article>

                <footer className='cardFooter'>

                    <Link to='https://open.spotify.com/user/aleon88' className='spotifyLogoContainer'>

                        <img className='spotifyIcon' src='/assets/spotify/icons/Spotify_Icon_RGB_Green.png' alt='Spotify logo icon' title='Spotify logo icon' />

                        <img className='spotifyLogo' src='/assets/spotify/logos/Spotify_Logo_RGB_Green.png' alt='Spotify logo' title='Spotify logo' />

                    </Link>

                    <nav className='spotifyButtons'>

                        <Link to={track_url}> Play on Spotify </Link>

                        <Link to={playlist_url}> Open playlist </Link>

                    </nav>

                </footer>

            </section>

        </>

    );

};