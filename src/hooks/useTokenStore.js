import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/index';
import { fetchAPI } from '../api/fetchAPI';

export const useTokenStore = () => {

    const dispatch = useDispatch();


    const fetchData = async () => {

        const url = 'https://soundquest-xf5r.onrender.com/api/v1/token';

        try {
            
            const response = await fetchAPI(url);

            if(response.ok){

                const { data } = response;

                dispatch(setToken({
                    access_token: data.access_token,
                    token_type: data.token_type
                }));

            } else {

                throw response.error;

            };

        } catch (error) {
            
            console.log(error);

        };

    };


    return { fetchData };

};