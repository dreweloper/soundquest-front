import { useEffect } from "react";
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
    useEffect(() => {

        form && getUserProfile(form);

    }, [form]);


    return (

        <>

            <div className='overlay'>

                <section className='host-form-container fade-in-transition'>

                    <button
                        className="close-button"
                        disabled={isHostLoading || isHostUpdated}
                        onClick={() => { dispatch(closeHostForm()) }}
                    >

                        <span className='material-symbols-rounded close-icon'>
                            close
                        </span>

                    </button>

                    <div className="host-form-description">

                        <h2>Lorem, ipsum dolor.</h2>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eligendi.</p>

                    </div>

                    <form
                        className='host-form'
                        onSubmit={handleSubmit}
                    >

                        <input type='text' name='username' id='username' placeholder='Enter a Spotify username' autoComplete="off" />

                        <input type='submit' value='Switch' disabled={isHostLoading || isHostUpdated} />

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