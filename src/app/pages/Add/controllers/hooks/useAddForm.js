import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthUserContext from '../../../../controller/contexts/AuthUserContext.js';
import { add, edit } from '../../../../controller';

const defaultForm = {
    image: '',
    price: 0,
    date: new Date().toISOString(),
};

const useAddForm = () => {
    const { state } = useLocation()
    const navigate = useNavigate();
    const { id } = useParams();

    const [user] = useContext(AuthUserContext);
    const [form, setForm] = useState(defaultForm);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (key, limit) => e => {
        e.preventDefault();
        editForm(key, e.target.value, limit);
    };

    const editForm = (key, value, limit = 80) => {
        if (typeof limit === 'function') {
            if (!limit(value)) return;
        } else {
            if (value.length >= limit) return;
        }
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const submit = async e => {
        e.preventDefault();
        setDisabled(true);

        const data = {
            ...form,
            date: new Date(form.date).toISOString(),
            price: parseInt(parseFloat(form.price) * 100),
        };

        if (!id) await add({ drink: data }, user.uid);
        else await edit({ drink: data }, id, user.uid);

        setForm(defaultForm);
        setDisabled(false);
        navigate('/history');
    };

    useEffect(() => {
        if (!id) return;
        const data = JSON.parse(localStorage.getItem(id));
        data.price = data.price / 100;
        setForm(data);
    }, [id]);

    useEffect(() => {
        if (!state?.address || !state?.location) return;
        setForm({...defaultForm, address: state.address, location: state.location});
    }, [state]);

    return {
        disabled,
        form,
        id,

        setForm,
        editForm,
        handleChange,
        submit,
    };
}

export default useAddForm;
