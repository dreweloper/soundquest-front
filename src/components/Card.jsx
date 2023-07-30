import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFetchMongoDB } from '../hooks';
import { setDislike, setLike } from '../store/slices';
import { setIconFill } from '../helpers';

export const Card = () => {

    const { like } = useSelector(state => state.like);

    const dispatch = useDispatch();


    const { playlist_url } = useSelector(state => state.playlist);

    const { artwork, artist, name, track_url } = useSelector(state => state.track);



    // MONGODB
    const { addTrack, deleteTrack } = useFetchMongoDB();


    const handleLike = () => {

        if (!like) {

            dispatch(setLike()); // Changes the 'like' state's value to 'true'.

            addTrack(); // Adds the track to MongoDB.

            setIconFill(1); // Changes the icon 'favorite' fill's value to '1'.

        } else {

            dispatch(setDislike()); // Changes the 'like' state's value to 'false'.

            deleteTrack(); // Deletes the track of MongoDB.

            setIconFill(0); // Changes the icon 'favorite' fill's value to '0'.

        };

    };


    return (

        <>

            <section className='cardContainer'>

                <article className='cardItem'>

                    <div className='artwork'>

                        <img src={artwork} alt="Album cover" title="Album cover" />

                    </div>

                    <div className='trackInfo'>

                        <p className='song'> {name} </p>

                        <p className='artist'> {artist} </p>

                        <button onClick={handleLike}>

                            <span id='like' className="material-symbols-rounded">
                                favorite
                            </span>

                        </button>

                    </div>

                </article>

                <nav className='cardNav'>

                    <div className='spotifyLogoContainer'>

                        <img className='spotifyIcon' src='/assets/spotify/icons/Spotify_Icon_RGB_Green.png' alt='Spotify logo icon' title='Spotify logo icon' />

                        <img className='spotifyLogo' src='/public/assets/spotify/logos/Spotify_Logo_RGB_Green.png' alt='Spotify logo' title='Spotify logo' />

                    </div>

                    <div className='spotifyButtons'>

                        <Link to={track_url}> Play on Spotify </Link>

                        <Link to={playlist_url}> Open playlist </Link>

                    </div>

                </nav>

            </section>

        </>

    );

};