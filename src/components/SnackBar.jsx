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

            <div className="snackbar">

                <div className="snackbar-message">

                    <h3>{!likeError ? 'Track added' : 'An error ocurred'}</h3>

                    <p>{!likeError ? `Likes counter: ${likesCounter}` : 'Try again, please'}</p>

                </div>

                <button
                    className="snackbar-button"
                    onClick={() => { dispatch(closeLikeSnackBar()) }}
                >

                    <span className='material-symbols-rounded close-icon'>
                        close
                    </span>

                </button>

            </div>

        </>

    );

};