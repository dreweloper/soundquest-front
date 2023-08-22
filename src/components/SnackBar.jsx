import { useDispatch, useSelector } from "react-redux";
import { closeLikeSnackBar } from "../store/slices";

export const SnackBar = () => {

    // REDUX HOOKS
    const { likeError, likesCounter } = useSelector(state => state.like);
    /**
     * The dispatch function from Redux to dispatch actions.
     * @type {Function}
     */
    const dispatch = useDispatch();


    return (

        <>

            <div className={!likeError ? "snackbar success-bg-color" : "snackbar danger-bg-color"}>

                <div className="snackbar-message">

                    {!likeError ? (

                        <p><span>{likesCounter}</span> tracks have been liked in total.</p>

                    ) : (

                        <p>An error occurred. Please try again.</p>

                    )}

                </div>

                <button
                    className="close-button"
                    onClick={() => { dispatch(closeLikeSnackBar()) }}
                >

                    <span className='material-symbols-rounded close-icon'>
                        close
                    </span>

                </button>

            </div >

        </>

    );

};