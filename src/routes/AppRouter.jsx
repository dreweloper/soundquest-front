import { Routes, Route, Navigate } from 'react-router-dom';
import { DiscoverPage, HomePage } from '../pages';

export const AppRouter = () => {


    return (

        <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/discover' element={<DiscoverPage />} />

            <Route path={'/*'} element={<Navigate to='/' />} />

        </Routes>

    );
};