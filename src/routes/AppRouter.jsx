import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, ResultsPage } from '../pages';
import { Error } from '../components/Error';

export const AppRouter = () => {


    return (

        <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/results' element={<ResultsPage />} />
            <Route path='/error' element={<Error />} />

            <Route path={'/*'} element={<Navigate to='/' />} />

        </Routes>

    );
};