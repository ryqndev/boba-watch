import {useState} from 'react';

const useInput = (initialValue, defaultValue='', maxLength=500) => {
    const [value, setValue] = useState(initialValue ?? defaultValue);

    const handleTextChange = setValue => e => {
        e.preventDefault();
        if(e.target.value.length >= maxLength) return;
        setValue(e.target.value);
    }

    return [
        value,
        handleTextChange,
        setValue
    ];
}

export default useInput;