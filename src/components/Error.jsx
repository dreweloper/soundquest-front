import { Footer, NavBar } from "../layouts";

export const Error = () => {
    return (

        <>

            <NavBar />

            <main className="main-error">

                <div className="error-toast">

                    <span class="material-symbols-rounded error-icon">
                        error
                    </span>

                    <div className='text-error-container'>

                        <p className='error-title'>Oops! <span role="img" aria-label="Face with a wide smile, squinting eyes and a bead of sweat.">😅</span></p>

                        <p className='error-subtitle'>Try again, please…</p>

                    </div>

                    <span class="material-symbols-rounded close-icon">
                        close
                    </span>

                </div>

            </main>

            <Footer />

        </>

    );

};