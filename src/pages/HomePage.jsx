import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchMongoDB, useTokenStore } from '../hooks';

/**
 * The home page component that displays a header and a link to the discover page.
 * It wakes up the back-end's server on Render.
 *
 * @component
 * @example
 * return (
 *     <HomePage />
 * );
 */
export const HomePage = () => {

    // CUSTOM HOOKS
    const { getTracks } = useFetchMongoDB();
    const { getToken } = useTokenStore();

    /**
     * React useEffect hook to fetch tracks when the component is mounted.
     * It wakes up the back-end's server (Render).
     *
     * @memberof HomePage
     * @function useEffect
     * @param {function} getTracks - A function to fetch tracks from MongoDB.
     * @param {Array} dependencies - An empty array, indicating this effect runs only once on component mount.
     */
    useEffect(() => {

        getTracks();

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

                <Link
                    to='/discover'
                    onClick={getToken}
                >

                    <span className="material-symbols-rounded">
                        arrow_forward
                    </span>

                </Link>

            </main>

        </>

    );

};