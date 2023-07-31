import { Link } from 'react-router-dom';
import { useResetStates } from '../hooks';

export const NavBar = () => {

    const { resetStates } = useResetStates();


    return (

        <nav className='navBar'>

            <Link to='/' onClick={resetStates}>

                <span className="material-symbols-rounded">
                    equalizer
                </span>

                <span className='titleNav'>SoundQuest</span>

            </Link>

        </nav>

    );

};