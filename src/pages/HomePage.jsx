import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchMongoDB } from '../hooks';

export const HomePage = () => {

    // HOOKS
    const { getTracks } = useFetchMongoDB();


    // USEEFFECTS
    useEffect(() => {

        getTracks(); // To wake up back-end's server (Render).

    }, []);


    return (

        <>

            <main className="mainHome">

                <header>

                    <span className="material-symbols-rounded equalizerIcon">
                        equalizer
                    </span>

                    <div className='headerHome'>

                        <h1> SoundQuest </h1>

                        <p> Let's discover new music! </p>

                    </div>

                </header>

                <Link to='/discover'>

                    <span className="material-symbols-rounded">
                        arrow_forward
                    </span>

                </Link>

            </main>

        </>

    );

};