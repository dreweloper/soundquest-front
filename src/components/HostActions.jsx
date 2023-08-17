import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHostForm, openHostForm } from "../store/slices";
import { useTokenStore } from "../hooks";
import { HostForm } from "./HostForm";

export const HostActions = () => {

    // REDUX HOOKS
    const { host: { username }, isHostFormOpen } = useSelector(state => state.host);
    const { isLoading } = useSelector(state => state.loading);

    const dispatch = useDispatch();

    // REDUX MIDDLEWARE (CUSTOM HOOK)
    const { getToken } = useTokenStore();

    // REDUX HOOK
    useEffect(() => {
        // Handles closing the 'HostForm' component when navigating using browser arrow keys.
        if(isHostFormOpen) dispatch(closeHostForm());

    }, []);


    return (

        <>

            <section>

                <h2>{username}</h2>

                <button
                    className='card-nav-button'
                    onClick={() => { dispatch(openHostForm()) }}
                    disabled={isLoading}
                >
                    Become a Host
                </button>

                <button
                    className='card-shuffle-button fade-in-transition'
                    onClick={getToken}
                    disabled={isLoading}
                >
                    Shuffle another
                </button>

            </section>

            {
                isHostFormOpen && <HostForm />
            }

        </>

    );

};