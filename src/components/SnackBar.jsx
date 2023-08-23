import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const SnackBar = () => {

    // REDUX HOOK
    /**
     * The 'like' state object from Redux store.
     * @type {Object}
     * @property {Boolean} likeError - A flag indicating whether an error has occurred while adding the song to MongoDB.
     * @property {Number} likesCounter - The count of total likes.
     */
    const { likeError, likesCounter } = useSelector(state => state.like);

    // REACT HOOKS
    /**
     * State to control the visibility of a component.
     * @type {boolean}
     * @default true
     */
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        /**
         * A flag indicating whether the component is currently mounted.
         * This flag is used to prevent state updates on an unmounted component.
         * @type {Boolean}
         */
        let isMounted = true;
        /**
         * Timer that changes the visibility state after a delay.
         * @type {Number}
         */
        const timer = setTimeout(() => {

            if (isMounted) setVisible(false);

        }, 3000);
        /**
         * Cleanup function to clear the timer and update the mounted status.
         */
        return () => {

            isMounted = false;

            clearTimeout(timer);

        };

    }, []);



    return (

        <>

            <div className={`snackbar ${visible ? 'slide-in' : 'slide-out'} ${!likeError ? 'success-bg-color' : 'danger-bg-color'}`}>

                <div className="snackbar-message">

                    {!likeError ? (

                        <p><span>{likesCounter}</span> tracks have been liked in total.</p>

                    ) : (

                        <p>An error occurred. Please try again.</p>

                    )}

                </div>

                <button
                    className="close-button"
                    onClick={() => { setVisible(false) }}
                >

                    <span className='material-symbols-rounded close-icon'>
                        close
                    </span>

                </button>

            </div >

        </>

    );

};