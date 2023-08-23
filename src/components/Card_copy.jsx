import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLikeStore } from '../hooks';
import { SnackBar } from './SnackBar';


export const Card = () => {

    // REDUX HOOKS
    const { playlist: { playlist_url } } = useSelector(state => state.playlist);
    const { track: { album, artwork, artist, name, track_url } } = useSelector(state => state.track);
    /**
     * The 'isLiked' state value from Redux store.
     * @type {Boolean}
     */
    const { isLiked, isLikeSnackBarOpen } = useSelector(state => state.like);

    // REDUX MIDDLEWARES (CUSTOM HOOK)
    const { addTrack, deleteTrack } = useLikeStore();

    // EVENT
    // If 'isLiked' is 'false', it is changed to 'true' and the track is added to the MongoDB API, and vice versa.
    const handleLike = () => !isLiked ? addTrack() : deleteTrack();


    return (

        <>

            <section className='card-container fade-in-transition'>

                <div className='artwork'>

                    <img src={artwork} alt={`Cover of the album "${album}"`} title={`Cover of the album "${album}"`} />

                </div>

                <div className='card-item'>

                    <article className='track-info'>

                        <div className='track-info-container'>

                            <p className='song'> {name} </p>

                            <p className='artist'> {artist} </p>

                        </div>

                        <button
                            className='like-button'
                            onClick={handleLike}
                        >

                            <span id='like' className="material-symbols-rounded like-icon">
                                favorite
                            </span>

                        </button>

                        {
                            isLikeSnackBarOpen && (<SnackBar />)
                        }

                    </article>

                    <nav className='card-nav'>

                        <Link className='card-nav-button' to={track_url} target='_blank'> Play on Spotify </Link>

                        <Link className='card-nav-button' to={playlist_url} target='_blank'> Open Playlist </Link>

                    </nav>

                </div>

            </section>

        </>

    );

};