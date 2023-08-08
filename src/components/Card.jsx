import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLikeStore, useTokenStore } from '../hooks';
import { HostForm } from './HostForm';
import { openHostForm } from '../store/slices';


export const Card = () => {

    // REDUX HOOKS
    const { playlist_url } = useSelector(state => state.playlist);
    const { album, artwork, artist, name, track_url } = useSelector(state => state.track);
    const { isHostFormOpen } = useSelector(state => state.host);

    const dispatch = useDispatch();

    // REDUX MIDDLEWARES (CUSTOM HOOK)
    const { getToken } = useTokenStore();

    // CUSTOM HOOKS
    const { handleLike } = useLikeStore();


    return (

        <>

            <button
                className='card-shuffle-button fade-in-transition'
                onClick={getToken}
            >

                <span className="material-symbols-rounded">
                    shuffle
                </span>

            </button>

            <section className='card-container fade-in-transition'>

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

                        <Link className='card-nav-button' to={track_url}> Play on Spotify </Link>

                        <Link className='card-nav-button' to={playlist_url}> Open playlist </Link>

                        <button
                            className='card-nav-button'
                            onClick={() => { dispatch(openHostForm()) }}
                        >
                            Become a Host
                        </button>

                    </nav>

                </div>

            </section>

            {
                isHostFormOpen && <HostForm />
            }

        </>

    );

};