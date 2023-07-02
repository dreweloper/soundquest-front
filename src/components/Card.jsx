
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

            </section>

        </>

    );

};