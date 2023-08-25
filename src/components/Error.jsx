import { useTokenStore } from "../hooks";

export const Error = () => {

    // REDUX MIDDLEWARE (CUSTOM HOOK)
    const { getToken } = useTokenStore();


    return (

        <>

            <section className='error-toast-section'>

                <div className='error-toast-container'>

                    <span className='material-symbols-rounded error-icon'>
                        error
                    </span>

                    <div className='error-toast-message'>

                        <h3>An Error Occurred:</h3>

                        <p>An error occurred while processing your request. Please try again.</p>

                    </div>

                    <button
                        className='close-button'
                        onClick={() => { getToken() }}>

                        <span className='material-symbols-rounded'>
                            close
                        </span>

                    </button>

                </div>

            </section>

        </>

    );

};