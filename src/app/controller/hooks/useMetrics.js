import {useState, useEffect, useContext} from 'react';
import {getUserStats} from '../../libs/firestore';
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

        getUserStats().then(resp => {
            setMetrics(resp.data());
        }).catch(onError);

    }, [uid, authUser.uid]);

    return metrics;
}

export default useMetrics;