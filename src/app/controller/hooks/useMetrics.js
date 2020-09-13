import {useState, useEffect} from 'react';
import {getUserStats} from '../../libs/firestore';
import {metrics as defaultMetrics} from '../../defaults';

const useMetrics = (uid) => {
    const [metrics, setMetrics] = useState(JSON.parse(localStorage.getItem('metrics')));
    useEffect(() => {
        setMetrics({});
        (async() => {
            try{
                setMetrics((await getUserStats(uid)).data());
            }catch(err){
                setMetrics(defaultMetrics);
            }
        })();
    }, [uid]);
    return metrics;
}

export default useMetrics;