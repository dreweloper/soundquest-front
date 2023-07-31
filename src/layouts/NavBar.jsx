import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearPlaylist, clearToken, clearTrack, finishLoading } from '../store/slices';

export const NavBar = () => {

    const dispatch = useDispatch();

    const handleReset = () => {

        dispatch(clearToken());

        dispatch(clearPlaylist());

        dispatch(clearTrack());

        dispatch(finishLoading());

    };


    return (

        <nav className='navBar'>

            <Link to='/' onClick={handleReset}>

                <span className="material-symbols-rounded">
                    equalizer
                </span>

                <span className='titleNav'>SoundQuest</span>

            </Link>

        </nav>

    );

};