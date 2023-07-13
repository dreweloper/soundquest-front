import { Link } from 'react-router-dom';

export const HomePage = () => {


    return (

        <>

            <main className="mainHome">

                <header>

                    <span className="material-symbols-rounded equalizerIcon">
                        equalizer
                    </span>

                    <h1> SoundQuest </h1>

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