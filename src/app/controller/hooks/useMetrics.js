import { useState, useEffect, useContext } from 'react';
import { database } from '../../libs/firestore';
import { onError } from '../../libs/analytics';
import AuthUserContext from '../contexts/AuthUserContext';
import { getDefaultMetrics } from '../calculateStatistics';

const useMetrics = (uid) => {
    const [metrics, setMetrics] = useState(getDefaultMetrics());
    const [user] = useContext(AuthUserContext);

    useEffect(() => {
        if (uid === undefined || user.uid === uid)
            return setMetrics(JSON.parse(localStorage.getItem('metrics')));

        setMetrics({});

        database.collection(`users/${uid}/user`).doc('stats').get().then(resp => {
            setMetrics(resp.data());
        }).catch(onError);

    }, [uid, user.uid]);

    return metrics;
}

export default useMetrics;
