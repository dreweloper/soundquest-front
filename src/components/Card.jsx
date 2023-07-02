import { Link } from 'react-router-dom';

export const Card = ({ track }) => {

    const { album, image, artist, name, url } = track;


    return (

        <>

            <section className='trackCard'>

                <div className='albumCover'>

                    <img src={image} alt="Album cover" title="Album cover" />

                </div>

                <p className='song'> {name} </p>

                <p className='artist'> {artist} </p>

                {/* <p> {album} </p> */}

                <Link to={url}>

                    <span className="material-symbols-rounded">
                        play_circle
                    </span>
                    
                    Play now
                </Link>

            </section>

        </>

    );

};