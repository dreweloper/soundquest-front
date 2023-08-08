import { useEffect } from "react";
import { useForm, useHostStore } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeHostForm } from "../store/slices";

export const HostForm = () => {

    // REDUX HOOKS
    const { errorHost, errorMessage } = useSelector(state => state.host);

    const dispatch = useDispatch();

    // REDUX MIDDLEWARE (CUSTOM HOOKS)
    const { getUserProfile } = useHostStore();

    // CUSTOM HOOKS
    const { form, handleSubmit } = useForm();

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
                        onClick={() => { dispatch(closeHostForm()) }}
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

                        <input type='submit' value='Send' />

                    </form>

                    {
                        errorHost && (
                            <div className='host-error-container fade-in-transition'>

                                <span className='material-symbols-rounded'>
                                    error
                                </span>

                                <p className='host-error-message'>{errorMessage}</p>

                            </div>

                        )
                    }

                </section>

            </div>

        </>

    );

};