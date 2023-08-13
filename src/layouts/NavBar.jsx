import { Link } from 'react-router-dom';

export const NavBar = () => {


    return (

        <nav className='nav-bar fade-in-transition'>

            <Link to='/'>

                <span className="material-symbols-rounded">
                    equalizer
                </span>

                <span className='title-nav'>SoundQuest</span>

            </Link>

        </nav>

    );

};