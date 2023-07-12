import { Link } from 'react-router-dom';

export const Card = ({ track }) => {

    const { album, artwork, artist, name, track_url } = track;


    return (

        <>

            <section className='trackContainer'>

                <div className='artwork'>

                    <img src={artwork} alt="Album cover" title="Album cover" />

                </div>

                <article className='trackInfo'>

                    <p className='song'> {name} </p>

                    <p className='artist'> {artist} </p>

                    <Link to={track_url} className='spotifyLink'>

                        <img src='/assets/spotify/icons/Spotify_Icon_RGB_Black.png' alt="Spotify logo" title='Spotify logo' />

                        Play now

                    </Link>

                </article>

            </section>

        </>

    );

};