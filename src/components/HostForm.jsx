import { useEffect } from "react";
import { useForm, useHostStore } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorHost, closeHostForm } from "../store/slices";

export const HostForm = () => {

    // REDUX HOOKS
    const { errorHost, errorMessage, isHostLoading, isHostUpdated } = useSelector(state => state.host);

    const dispatch = useDispatch();

    // REDUX MIDDLEWARE (CUSTOM HOOKS)
    const { getUserProfile } = useHostStore();

    // CUSTOM HOOKS
    const { form, handleSubmit } = useForm();

    // EVENT
    const handleCloseHostForm = () => {

        dispatch(closeHostForm());

        dispatch(clearErrorHost());

    };

    // REACT HOOKS
    useEffect(() => {

        form && getUserProfile(form);

    }, [form]);


    return (

        <>

            <div className='overlay'>

                <section className='host-form-container fade-in-transition'>

                    <button
                        className="close-button"
                        onClick={handleCloseHostForm}
                    >

                        <span className='material-symbols-rounded'>
                            close
                        </span>

                    </button>

                    <div className="host-form-description">

                        <h2>Become a Host</h2>

                        <p>Discover random tracks from any Spotify user’s playlists!</p>

                    </div>

                    <form
                        className='host-form'
                        onSubmit={handleSubmit}
                    >

                        <input type='text' name='username' id='username' placeholder='Enter a Spotify username' autoComplete="off" />

                        <input type='submit' value='Send' disabled={isHostLoading || isHostUpdated} />

                    </form>

                    <div className='host-container'>

                        {
                            isHostLoading && (<span className="loader"></span>)
                        }

                        {
                            !isHostLoading && errorHost && (
                                <>
                                    <span className='material-symbols-rounded danger-color fade-in-transition'>
                                        error
                                    </span>

                                    <p className='danger-color fade-in-transition'>{errorMessage}</p>
                                </>
                            )
                        }

                        {
                            !isHostLoading && isHostUpdated && (
                                <>
                                    <span className='material-symbols-rounded success-color fade-in-transition'>
                                        check_circle
                                    </span>

                                    <p className='success-color fade-in-transition'>The host has been successfully updated.</p>
                                </>
                            )
                        }

                    </div>

                </section>

            </div>

        </>

    );

};