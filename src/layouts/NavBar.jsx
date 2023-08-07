import { Link } from 'react-router-dom';
import { useResetStates } from '../hooks';

export const NavBar = () => {

    const { resetStates } = useResetStates();


    return (

        <nav className='nav-bar fade-in-transition'>

            <Link to='/' onClick={resetStates}>

                <span className="material-symbols-rounded">
                    equalizer
                </span>

                <span className='title-nav'>SoundQuest</span>

            </Link>

        </nav>

    );

};