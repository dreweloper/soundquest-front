import { useEffect, useState } from "react";
import { useForm, useHostStore } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeHostForm } from "../store/slices";

export const HostForm = () => {

    // REDUX HOOKS
    const {
        error: { errorHost, errorMessage },
        isHostLoading,
        isHostUpdated
    } = useSelector(state => state.host);

    const dispatch = useDispatch();

    // REDUX MIDDLEWARE (CUSTOM HOOKS)
    const { getUserProfile } = useHostStore();

    // CUSTOM HOOKS
    const { form, handleSubmit } = useForm();

    // REACT HOOKS
    const [language, setLanguage] = useState('EN');

    useEffect(() => {

        form && getUserProfile(form);

    }, [form]);


    return (

        <>

            <div className='overlay'>

                <section className='host-form-section fade-in-transition'>

                    <div className='host-form-top'>

                        <div className='lang-options'>

                            <span
                                className={language == 'EN' ? 'font-bold cursor-pointer' : 'cursor-pointer'}
                                onClick={() => { setLanguage('EN') }}
                            > EN </span>

                            <span>|</span>

                            <span
                                className={language == 'ES' ? 'font-bold cursor-pointer' : 'cursor-pointer'}
                                onClick={() => { setLanguage('ES') }}
                            > ES </span>

                        </div>

                        <button
                            className='close-box-button'
                            disabled={isHostLoading || isHostUpdated}
                            onClick={() => { dispatch(closeHostForm()) }}
                        >

                            <span className='material-symbols-rounded close-icon'>
                                close
                            </span>

                        </button>

                    </div>

                    <div className="host-form-description">

                        {
                            language == 'EN' && (
                                <>

                                    <h2>Connect through music: share yours or discover others' playlists</h2>

                                    <p>Special tip: change the host to “<span>Spotify</span>” and explore tracks from over 1,300 playlists curated by professionals.</p>

                                </>
                            )
                        }

                        {
                            language == 'ES' && (
                                <>

                                    <h2>Conecta a través de la música: comparte tus playlists o descubre nuevas</h2>

                                    <p>Special tip: cambia el host a “<span>Spotify</span>” y explora canciones de entre más de 1.300 listas seleccionadas por profesionales.</p>

                                </>
                            )
                        }

                    </div>

                    <form
                        className='host-form'
                        onSubmit={handleSubmit}
                    >

                        <input type='text' name='username' id='username' placeholder='Enter a Spotify username' autoComplete="off" />

                        <input type='submit' value={isHostLoading ? 'Loading…' : 'Switch'} disabled={isHostLoading || isHostUpdated} />

                    </form>

                    {
                        !isHostLoading && errorHost && (
                            <div className='host-form-message'>
                                <span className='material-symbols-rounded danger-color fade-in-transition'>
                                    error
                                </span>

                                <p className='danger-color fade-in-transition'>{errorMessage}</p>
                            </div>
                        )
                    }

                    {
                        !isHostLoading && isHostUpdated && (
                            <div className='host-form-message'>
                                <span className='material-symbols-rounded success-color fade-in-transition'>
                                    check_circle
                                </span>

                                <p className='success-color fade-in-transition'>The host has been successfully updated.</p>
                            </div>
                        )
                    }

                </section>

            </div>

        </>

    );

};