import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearPlaylist, clearToken, clearTrack, finishLoading } from '../store/slices';
import { useEffect } from 'react';
import { useFetchMongoDB } from '../hooks';

export const HomePage = () => {

    const dispatch = useDispatch();

    const { getTracks } = useFetchMongoDB();


    const handleButton = () => {

        dispatch(clearToken());

        dispatch(clearPlaylist());

        dispatch(clearTrack());

        dispatch(finishLoading());

    };


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