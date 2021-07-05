import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthUserContext from '../contexts/AuthUserContext';

/**
 * @description useLogin is a hook that exists in the login page. If there is no user logged in, it will 
 * do nothing. Otherwise, it will redirect to the dashboard page.
 */
const useLogin = () => {
    const history = useHistory();
    const [user] = useContext(AuthUserContext);

    useEffect(() => {
        if (user) history.push('/');
    }, [user, history]);
}

export default useLogin;
