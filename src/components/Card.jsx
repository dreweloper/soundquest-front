import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Card = () => {

    const { playlist_url } = useSelector(state => state.playlist);

    const { album, artwork, artist, name, track_url } = useSelector(state => state.track);


    return (

        <>

            <article className='trackContainer'>

                <div className='artwork'>

                    <img src={artwork} alt="Album cover" title="Album cover" />

                </div>

                <div className='trackInfo'>

                    <p className='song'> {name} </p>

                    <p className='artist'> {artist} </p>

                    <div className='spotifyButtons'>

                        <Link to={track_url}>

                            <span className="material-symbols-rounded">
                                play_arrow
                            </span>

                            Play
                        </Link>

                        <Link to={playlist_url}>Open Playlist</Link>

                    </div>

                </div>

            </article>

        </>

    );

};