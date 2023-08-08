import { useState } from "react";

export const useForm = () => {

    // REACT HOOKS
    const [form, setForm] = useState();

    // FUNCTIONS
    const handleSubmit = (ev) => {

        ev.preventDefault();

        setForm(ev.target.username.value);

    }; //!HANDLESUBMIT


    return { form, handleSubmit };

};