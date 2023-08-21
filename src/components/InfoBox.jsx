import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { en, es } from '../data/infoBoxTexts.json';

export const InfoBox = ({ isInfoBoxOpen, setIsInfoBoxOpen }) => {

    const [language, setLanguage] = useState('EN');


    return (

        <>

            <div className='overlay'>

                <article className='info-box-card'>

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

                    {
                        language == 'EN' && (
                            <div className='info-box-text'>

                                <h2>{en.title}</h2>
                                
                                <p>{en.description}</p>

                            </div>
                        )
                    }

                    {
                        language == 'ES' && (
                            <div className='info-box-text'>

                                <h2>{es.title}</h2>

                                <p>{es.description}</p>

                            </div>
                        )
                    }

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