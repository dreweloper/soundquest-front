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

        if(!like){

            dispatch(setLike()); // It changes the 'like' state's value to 'true'.

            addTrack(); // It adds the track to MongoDB.

            setIconFill(1); // It changes the icon 'favorite' fill's value to '1'.

        } else {

            dispatch(setDislike()); // It changes the 'like' state's value to 'false'.

            deleteTrack(); // It deletes the track of MongoDB.

            setIconFill(0); // It changes the icon 'favorite' fill's value to '0'.

        };

    };


    return (

        <>

            <article className='trackContainer'>

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

                    <nav className='spotifyButtons'>

                        <Link to={track_url}>

                            <span className="material-symbols-rounded">
                                play_arrow
                            </span>

                            Play
                        </Link>

                        <Link to={playlist_url}>Open Playlist</Link>

                    </nav>

                </div>

            </article>

        </>

    );

};