import {useState, useEffect, useContext} from 'react';
import {database} from '../../libs/firestore';
import {onError} from '../../libs/analytics';
import AuthUserContext from '../contexts/AuthUserContext';
import stats from '../calculateStatistics';

const useMetrics = (uid) => {
    const [metrics, setMetrics] = useState(stats.getDefaultMetrics());
    const [authUser] = useContext(AuthUserContext);

    useEffect(() => {
        if(uid === undefined || authUser.uid === uid) 
            return setMetrics(JSON.parse(localStorage.getItem('metrics')));

        setMetrics({});

        database.collection(`users/${uid}/user`).doc('stats').get().then(resp => {
            setMetrics(resp.data());
        }).catch(onError);

    }, [uid, authUser.uid]);

    return metrics;
}

export default useMetrics;