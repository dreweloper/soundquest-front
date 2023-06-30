import { Link } from 'react-router-dom';

export const Card = ({ track }) => {

    const { album, image, artist, name, url } = track;


    return (

        <>
        
            <section>

                <div>

                    <img src={image} alt="Album cover" title="Album cover" width="300px" />

                </div>

                <p> <strong> Song: </strong> {name} </p>

                <p> <strong> Artist: </strong> {artist} </p>

                <p> <strong> Album: </strong> {album} </p>

                <Link to={url}> Open Spotify! </Link>

            </section>

        </>

    );

};