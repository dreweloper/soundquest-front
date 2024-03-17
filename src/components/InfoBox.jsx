import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const InfoBox = ({ isInfoBoxOpen, setIsInfoBoxOpen }) => {

    // REACT HOOK
    const [language, setLanguage] = useState('EN');


    return (

        <>

            <div className='overlay'>

                <article className='info-box-card fade-in-transition'>

                    <div className='info-box-container'>

                        <div className='lang-options'>

                            <span
                                className={language == 'EN' ? 'font-bold cursor-pointer' : 'cursor-pointer'}
                                onClick={() => { setLanguage('EN') }}
                            >
                                EN
                            </span>

                            <span>|</span>

                            <span
                                className={language == 'ES' ? 'font-bold cursor-pointer' : 'cursor-pointer'}
                                onClick={() => { setLanguage('ES') }}
                            >
                                ES
                            </span>

                        </div>

                        <button
                            className='close-box-button'
                            onClick={() => { setIsInfoBoxOpen(!isInfoBoxOpen) }}
                        >

                            <span className='material-symbols-rounded close-icon'>
                                close
                            </span>

                        </button>

                    </div>

                    <div className='info-box-text'>

                        {
                            language == 'EN' && (
                                <>

                                    <h2>Explore music like never before</h2>

                                    <p>Experience the thrill of discovering new music with our “Random Track” button, or use the “Switch Host” feature to share your playlists or uncover ones you never knew existed. All powered by Spotify's API and our custom algorithm. Embrace the SoundQuest journey!</p>

                                </>
                            )
                        }

                        {
                            language == 'ES' && (
                                <>

                                    <h2>Explora la música como nunca antes</h2>

                                    <p>Descubre canciones completamente aleatorias con nuestro botón “Random Track”, o prueba la función “Switch Host” para compartir tus playlists o descubrir otras que desconocías. Todo esto potenciado por la API de Spotify y nuestro algoritmo personalizado. ¡Embárcate en la experiencia SoundQuest!</p>

                                </>
                            )
                        }

                    </div>

                    <div className='info-box-contact'>

                        {
                            language == 'EN' && (<p>Developed by <span>Andrés León</span></p>)
                        }

                        {
                            language == 'ES' && (<p>Desarrollado por <span>Andrés León</span></p>)
                        }

                        <Link className='github-link' to='https://github.com/dreweloper' target='_blank'>

                            <i className='devicon-github-original'></i>

                        </Link>

                    </div>

                </article>

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