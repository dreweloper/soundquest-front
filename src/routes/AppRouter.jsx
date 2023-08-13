import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HomePage, ResultsPage } from '../pages';
import { useEffect } from 'react';
import { useTokenStore } from '../hooks';

export const AppRouter = () => {

    // REACT-ROUTER-DOM HOOK
    const location = useLocation();

    // CUSTOM HOOK
    const { getToken } = useTokenStore();

    // REACT HOOK
    useEffect(() => {

        if(location.pathname == '/results') getToken();

    }, [location]);


    return (

        <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/results' element={<ResultsPage />} />

            <Route path={'/*'} element={<Navigate to='/' />} />

        </Routes>

    );
};