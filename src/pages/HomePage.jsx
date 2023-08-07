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

            <main className='main-home fade-in-transition'>

                <section className='section-home'>

                    <span className='material-symbols-rounded sq-logo'>
                        equalizer
                    </span>

                    <div className='headline'>

                        <h1>SoundQuest</h1>

                        <p>Find your next favorite song.</p>

                    </div>

                </section>

                <Link
                    to='/results'
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