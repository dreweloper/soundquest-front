import { useSelector } from 'react-redux';
import { useTokenStore } from "../hooks";

export const HomePage = () => {

    const { access_token } = useSelector(state => state.token);

    const { fetchData } = useTokenStore();


    const handleToken = () => {

        fetchData();

    };


    return (

        <>

            <h1> SoundQuest </h1>

            <button
                onClick={handleToken}
            >
                Generate token!
            </button>

            <p> {access_token} </p>

        </>

    );
};