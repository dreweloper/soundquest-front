import { useDispatch } from "react-redux";
import { clearError, clearToken } from "../store/slices";

export const Error = () => {

    // REDUX HOOKS
    const dispatch = useDispatch();

    // EVENT
    const handleCloseToast = () => {

        dispatch(clearError());

        dispatch(clearToken()); // To renderize de shuffle button in ResultsPage.

    };


    return (

        <>

            <section className='error-toast'>

                <div className='error-toast-container'>

                    <span className='material-symbols-rounded error-icon'>
                        error
                    </span>

                    <div className='text-error-container'>

                        <p className='error-title'>Oops! <span role='img' aria-label='Face with a wide smile, squinting eyes and a bead of sweat.'>😅</span></p>

                        <p className='error-subtitle'>Try again, please…</p>

                    </div>

                    <button onClick={handleCloseToast}>

                        <span className='material-symbols-rounded close-icon'>
                            close
                        </span>

                    </button>

                </div>

            </section>

        </>

    );

};