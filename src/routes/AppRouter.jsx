import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, ResultsPage } from '../pages';

export const AppRouter = () => {


    return (

        <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/results' element={<ResultsPage />} />

            <Route path={'/*'} element={<Navigate to='/' />} />

        </Routes>

    );
};