import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUserContext from '../contexts/AuthUserContext';

/**
 * @description useLogin is a hook that exists in the login page. If there is no user logged in, it will 
 * do nothing. Otherwise, it will redirect to the dashboard page.
 */
const useLogin = () => {
    const navigate = useNavigate();
    const [user] = useContext(AuthUserContext);

    useEffect(() => {
        if (user && user !== 'logging-in') navigate('/');
    }, [user, navigate]);
}

export default useLogin;
