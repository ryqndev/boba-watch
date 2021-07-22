import { useState, useCallback, useContext } from 'react';
import { updateAutofill } from '../../../../controller';
import AuthUserContext from '../../../../controller/contexts/AuthUserContext';

const useAutofill = () => {
    const [user] = useContext(AuthUserContext);
    const [autofill, setAutofill] = useState(JSON.parse(localStorage.getItem('autofill')) ?? []);

    const update = useCallback(() => {
        setAutofill(JSON.parse(localStorage.getItem('autofill')) ?? []);
    }, []);

    const add = useCallback(form => {
        let data = [
            {
                ...form,
                value: form.name + new Date().toISOString(),
            },
            ...autofill,
        ];
        updateAutofill(data, user.uid, update);
    }, [autofill, user.uid, update]);

    return {
        autofill,
        add,
    }
}

export default useAutofill;
