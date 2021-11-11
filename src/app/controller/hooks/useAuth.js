import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUserContext from '../contexts/AuthUserContext';

/**
 * @description useLogin is a hook that exists in all auth pages. If there is no user logged in, it will 
 * redirect to about page. Otherwise, it will allow access to the auth required page.
 */
const useAuth = () => {
    let navigate = useNavigate();
    const [user] = useContext(AuthUserContext);

    useEffect(() => {
        if (!user) navigate('/about');
    }, [user, navigate]);

    return { user };
}

export default useAuth;
