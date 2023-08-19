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

                <div className='host-container'>

                    <Link
                        className='host-link'
                        to={profile_url}
                        target='_blank'
                    >

                        <span className='material-symbols-rounded host-icon'>
                            account_circle
                        </span>

                        <span className='host-username'>{username}</span>

                    </Link>

                    <button
                        className='host-button'
                        onClick={() => { dispatch(openHostForm()) }}
                        disabled={isLoading}
                    >
                        Switch Host
                    </button>

                </div>

                <button
                    className='shuffle-button'
                    onClick={getToken}
                    disabled={isLoading}
                >
                    Random Track
                </button>

            </section>

            {
                isHostFormOpen && <HostForm />
            }

        </>

    );

};