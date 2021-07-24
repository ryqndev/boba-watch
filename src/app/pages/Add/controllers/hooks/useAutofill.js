import { useState, useCallback, useContext } from 'react';
import { updateAutofill } from '../../../../controller';
import AuthUserContext from '../../../../controller/contexts/AuthUserContext';
import { alertAutofillAdd, alertAutofillDelete } from '../../../../libs/swal';

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
        updateAutofill(data, user.uid, () => {
            alertAutofillAdd();
            update();
        });

    }, [autofill, user.uid, update]);

    const remove = useCallback(value => {
        let data = [...autofill].filter(entry => entry.value !== value);

        updateAutofill(data, user.uid, () => {
            alertAutofillDelete();
            update();
        });
    }, [autofill, user.uid, update]);

    return {
        autofill,
        add,
        remove,
    }
}

export default useAutofill;
