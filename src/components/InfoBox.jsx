import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const InfoBox = ({ isInfoBoxOpen, setIsInfoBoxOpen }) => {

    const [language, setLanguage] = useState('EN');


    return (

        <>

            <div className='overlay'>

                <section className='info-box'>

                    <div className='language-options'>

                        <span
                            className={language == 'EN' ? 'font-bold' : null}
                            onClick={() => { setLanguage('EN')}}
                        >
                            EN
                        </span>
                        |
                        <span
                            className={language == 'ES' ? 'font-bold' : null}
                            onClick={() => { setLanguage('ES')}}
                        >
                            ES
                        </span>

                    </div>

                    <button
                        className='close-button'
                        onClick={() => { setIsInfoBoxOpen(!isInfoBoxOpen) }}
                    >

                        <span className='material-symbols-rounded close-icon'>
                            close
                        </span>

                    </button>

                    {
                        language == 'EN' && (<p className='info-text'>SoundQuest isn't just an app, it's your gateway to a universe of new music discovery. Leveraging Spotify's API, we cracked the code to bring you truly random tracks, sparking your musical journey like never before. What started as a way to share my own playlists evolved into something even greater. Now, you have the power to be the host, inviting yourself or a friend into the mix, or even tapping into Spotify's official user ID to explore over 1,300 professionally curated playlists. Click, explore, and embark on a limitless sonic journey with SoundQuest’s one-click wonder, right from where you are!</p>)
                    }

                    {
                        language == 'ES' && (<p className='info-text'>SoundQuest no es solo una aplicación, es tu entrada a un universo de música nueva. El resultado de combinar la API de Spotify y nuestro algoritmo es que ahora puedes disfrutar de una experiencia musical con canciones completamente aleatorias. Lo que comenzó como una forma de compartir mis propias playlists evolucionó en algo mucho más significativo. Ahora, tienes el poder de ser el anfitrión, ya sea invitándote a ti mismo o a un amigo, o incluso conectándote con el usuario oficial de Spotify para explorar más de 1.300 playlists curadas por profesionales. ¡Haz click, explora y embárcate en un viaje sonoro sin límites desde donde estés con SoundQuest!</p>)
                    }

                    <Link className='github-link' to='https://github.com/dreweloper' target='_blank'>

                        <i className='devicon-github-original'></i>

                    </Link>

                </section>

            </div>

        </>

    );

};

InfoBox.propTypes = {
    isInfoBoxOpen: PropTypes.bool.isRequired,
    setIsInfoBoxOpen: PropTypes.func.isRequired
};

InfoBox.defaultProps = {
    isInfoBoxOpen: false
};