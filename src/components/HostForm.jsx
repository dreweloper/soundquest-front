import { useForm } from "../hooks";

export const HostForm = () => {

    // CUSTOM HOOKS
    const { form, handleSubmit } = useForm();


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