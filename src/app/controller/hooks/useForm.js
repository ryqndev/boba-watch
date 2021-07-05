import {useState} from 'react';


const useForm = (inputs) => {
    const [formData, setFormData] = useState({});

    const handleTextChange = e => {
        e.preventDefault();
        // if(e.target.value.length >= maxLength) return;
        setFormData(e.target.value);
    }

    const clearForm = () => {
        setFormData(prevValues => {
            Object.keys(prevValues).forEach(key => prevValues[key] = '');
            return {...prevValues};
        });
    }

    return [
        formData,
        handleTextChange,
        clearForm,
    ];
}


export default useForm;