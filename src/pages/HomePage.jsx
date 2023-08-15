import { Link } from 'react-router-dom';
import { useVisit } from '../hooks';

export const HomePage = () => {

    // CUSTOM HOOKS
    const { recordVisit } = useVisit();


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
                    onClick={() => { recordVisit() }} // It also serves to awaken the Render server if it is idle.
                >

                    <span className="material-symbols-rounded">
                        arrow_forward
                    </span>

                </Link>

            </main>

        </>

    );

};