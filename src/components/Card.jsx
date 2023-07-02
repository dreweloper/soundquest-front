import { Link } from 'react-router-dom';

export const Card = ({ track }) => {

    const { album, image, artist, name, url } = track;


    return (

        <>

            <section className='trackContainer'>

                <div className='artwork'>

                    <img src={image} alt="Album cover" title="Album cover" />

                </div>

                <div className='trackInfo'>

                    <p className='song'> {name} </p>

                    <p className='artist'> {artist} </p>

                    <Link to={url} className='spotifyLink'>

                        <img src='/assets/spotify/icons/Spotify_Icon_RGB_Black.png' alt="Spotify logo" title='Spotify logo' />

                        Play now

                    </Link>

                </div>

            </section>

        </>

    );

};