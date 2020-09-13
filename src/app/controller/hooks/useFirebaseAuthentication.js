import { useState, useEffect } from 'react';
import firebase from 'firebase';

const useFirebaseAuthentication = (firebase) => {
    const [user, setUser] = useState(null);

    useEffect(firebase.auth.onAuthStateChanged(user => {
        user ? setUser(user) : setUser(null);
    }));

    return user;
}

export default useFirebaseAuthentication;