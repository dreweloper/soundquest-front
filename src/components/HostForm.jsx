import { useEffect } from "react";
import { useForm, useHostStore } from "../hooks";

export const HostForm = () => {

    // REDUX MIDDLEWARE (CUSTOM HOOK)
    const { getUserProfile } = useHostStore();

    // CUSTOM HOOKS
    const { form, handleSubmit } = useForm();

    useEffect(() => {

        form && getUserProfile(form);

    }, [form]);


    return (

        <>

            <form
                className='host-form'
                onSubmit={handleSubmit}
            >

                <label htmlFor='username'>Please enter a Spotify username:</label>

                <input type='text' name='username' id='username' autoComplete="off" />

                <input type='submit' value='Send' />

            </form>

        </>

    );

};