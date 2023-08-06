
export const Error = () => {


    return (

        <>

            <section className="error-toast">

                <div className="error-toast-container">

                    <span className="material-symbols-rounded error-icon">
                        error
                    </span>

                    <div className='text-error-container'>

                        <p className='error-title'>Oops! <span role="img" aria-label="Face with a wide smile, squinting eyes and a bead of sweat.">😅</span></p>

                        <p className='error-subtitle'>Try again, please…</p>

                    </div>

                    <button>

                        <span className="material-symbols-rounded close-icon">
                            close
                        </span>

                    </button>

                </div>

            </section>

        </>

    );

};