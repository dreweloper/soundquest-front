import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLikeStore, useTokenStore } from '../hooks';


export const Card = () => {

    // REDUX STATES
    const { playlist, track } = useSelector(state => state);

    // REDUX STATES DESTRUCTURING
    const { playlist_url } = playlist;
    const { album, artwork, artist, name, track_url } = track;

    // REDUX MIDDLEWARES (CUSTOM HOOKS)
    const { getToken } = useTokenStore();

    // CUSTOM HOOKS - EVENT
    const { handleLike } = useLikeStore();


    return (

        <>

            <button
                className='card-shuffle-button'
                onClick={getToken}
            // disabled={isLoading} // The button is disabled while the requests to the Spotify Web API are loading.
            >

                <span className="material-symbols-rounded">
                    shuffle
                </span>

            </button>

            <section className='card-container'>

                <div className='artwork'>

                    <img src={artwork} alt={`Cover of the album "${album}"`} title={`Cover of the album "${album}"`} />

                </div>

                <div className='card-item'>

                    <article className='track-info'>

                        <p className='song'> {name} </p>

                        <p className='artist'> {artist} </p>

                        <button
                            className='like-button'
                            onClick={handleLike}
                        >

                            <span id='like' className="material-symbols-rounded">
                                favorite
                            </span>

                        </button>

                    </article>

                    <nav className='card-nav'>

                        <Link className='spotify-button' to={track_url}> Play on Spotify </Link>

                        <Link className='spotify-button' to={playlist_url}> Open playlist </Link>

                        <Link className='host-button' to='#'> Become a Host </Link>

                    </nav>

                </div>

            </section>

        </>

    );

};