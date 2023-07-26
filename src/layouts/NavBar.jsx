import { Link } from 'react-router-dom';

export const NavBar = () => {


    return (

        <nav className='navBar'>

            <Link to='/'>

                <span className="material-symbols-rounded">
                    equalizer
                </span>

                <span className='titleNav'>SoundQuest</span>

            </Link>

        </nav>

    );

};