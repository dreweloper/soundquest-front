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

                <section className='host-form-section fade-in-transition'>

                    <div className='host-form-top'>

                        <button
                            disabled={isHostLoading || isHostUpdated}
                            onClick={() => { dispatch(closeHostForm()) }}
                        >

                            <span className='material-symbols-rounded close-icon'>
                                close
                            </span>

                        </button>

                    </div>

                    <div className="host-form-description">

                        <h2>Connect Through Music: Share Yours or Discover Others’ Playlists!</h2>

                        <p>Special Tip: Choose “<span>spotify</span>” as the host and explore tracks from over 1,300 playlists curated by professionals.</p>

                    </div>

                    <form
                        className='host-form'
                        onSubmit={handleSubmit}
                    >

                        <input type='text' name='username' id='username' placeholder='Enter a Spotify username' autoComplete="off" />

                        <input type='submit' value={isHostLoading ? 'Loading…' : 'Switch'} disabled={isHostLoading || isHostUpdated} />

                    </form>

                    {
                        isHostLoading && (<span className="loader"></span>)
                    }

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