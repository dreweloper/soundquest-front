import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = ({ isInfoBoxOpen, setIsInfoBoxOpen }) => {


    return (

        <nav className='nav-bar fade-in-transition'>

            <Link className='nav-logo' to='/'>

                <span className='material-symbols-rounded equalizer-icon'>
                    equalizer
                </span>

                <span className='nav-logo-title'>SoundQuest</span>

            </Link>

            <button
                className='nav-button'
                onClick={() => { setIsInfoBoxOpen(!isInfoBoxOpen) }}
            >

                <span className='material-symbols-rounded info-icon'>
                    help_center
                </span>

            </button >

        </nav >

    );

};

NavBar.propTypes = {
    isInfoBoxOpen: PropTypes.bool.isRequired,
    setIsInfoBoxOpen: PropTypes.func.isRequired
};

NavBar.defaultProps = {
    isInfoBoxOpen: false
};