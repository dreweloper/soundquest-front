import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearPlaylist, clearToken, clearTrack, finishLoading } from '../store/slices';

export const HomePage = () => {

    const dispatch = useDispatch();


    const handleButton = () => {

        dispatch(clearToken());

        dispatch(clearPlaylist());

        dispatch(clearTrack());

        dispatch(finishLoading());

    };


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

                    <button onClick={handleButton}>

                        <span className="material-symbols-rounded">
                            arrow_forward
                        </span>

                    </button>

                </Link>

            </main>

        </>

    );

};