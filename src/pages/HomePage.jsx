import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLikeStore, useTokenStore, useVisit } from '../hooks';

export const HomePage = () => {

    // CUSTOM HOOKS
    const { getTracksCount } = useLikeStore();
    const { getToken } = useTokenStore();
    const { recordVisit } = useVisit();

    // REACT HOOKS
    useEffect(() => {

        // It also serves to awaken the Render server if it is idle.
        getTracksCount();

    }, []);

    // EVENTS
    const handleVisit = () => { //! Si desaparece 'getToken', se pasa directamente 'recordVisit' en el evento onClick (sin el handle).

        getToken();
        // It also serves to awaken the Render server if it is idle.
        recordVisit();

    };


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
                    onClick={handleVisit}
                >

                    <span className="material-symbols-rounded">
                        arrow_forward
                    </span>

                </Link>

            </main>

        </>

    );

};