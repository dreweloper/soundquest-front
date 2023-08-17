import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { closeHostForm, openHostForm } from "../store/slices";
import { useTokenStore } from "../hooks";
import { HostForm } from "./HostForm";

export const HostActions = () => {

    // REDUX HOOKS
    const { host: { username, profile_url }, isHostFormOpen } = useSelector(state => state.host);
    const { isLoading } = useSelector(state => state.loading);

    const dispatch = useDispatch();

    // REDUX MIDDLEWARE (CUSTOM HOOK)
    const { getToken } = useTokenStore();

    // REDUX HOOK
    useEffect(() => {
        // Handles closing the 'HostForm' component when navigating using browser arrow keys.
        if (isHostFormOpen) dispatch(closeHostForm());

    }, []);


    return (

        <>

            <section className='host-actions-section fade-in-transition'>

                <Link
                    className='host-link-container'
                    to={profile_url}
                    target='_blank'
                >

                    <span className='material-symbols-rounded'>
                        account_circle
                    </span>

                    <span className='host-username'>{username}</span>

                </Link>

                <div className='host-actions-container'>

                    <button
                        className='host-actions-button'
                        onClick={() => { dispatch(openHostForm()) }}
                        disabled={isLoading}
                    >
                        Change the Host
                    </button>

                    <button
                        className='host-actions-button'
                        onClick={getToken}
                        disabled={isLoading}
                    >
                        Shuffle another
                    </button>

                </div>

            </section>

            {
                isHostFormOpen && <HostForm />
            }

        </>

    );

};