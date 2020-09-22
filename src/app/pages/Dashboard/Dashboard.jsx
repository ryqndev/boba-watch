import React, {useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {toMoney} from '../../components/textUtil.js';
import DailyHeatMap from './graphs/DailyHeatMap';
import TimeBarGraphs from './graphs/TimeBarGraphs';
import UserSunburst from './graphs/UserSunburst';
import {Card} from '../../components';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import useMetrics from '../../controller/hooks/useMetrics';
import './Dashboard.scss';
import 'react-vis/dist/style.css';

const Dashboard = () => {
    const {t} = useTranslation();
    const metrics = useMetrics();

    const [authUser] = useContext(AuthUserContext);
    
    const [hourlyMetric, setHourlyMetric] = useState(Array(7).fill(Array(24).fill(0)));
    const [width, setWidth] = useState(window.innerWidth - 40);

    const resize = () => {setWidth(window.innerWidth - 40)}

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => {window.removeEventListener('resize', resize)}
    }, [setWidth]);

    useEffect(() => {
        if(!metrics?.d) return;
        setHourlyMetric(metrics.d);
    }, [metrics]);

    return (
        <div className="dashboard-page">
            <h4 className="bw title">{t('Monthly Spending')}</h4>
            <Card id="chart-holder">
                <div className="description">
                    {t('MONTHLY LIMIT')}: {t('$')}{toMoney(authUser.profile.budget, authUser.profile.budget/10000 > 1)}
                    <br />
                    <span>{t('$')}{toMoney(metrics.tc, metrics.tc/10000 > 1)}</span>
                    <br />
                    {t('REMAINING')}: {t('$')}{toMoney(authUser.profile.budget - metrics.tc)}
                </div>
                <UserSunburst budget={authUser.profile.budget} spent={metrics.tc} width={width}/>
            </Card>
            <Card className="budget">
                <p>{t('This is how much you’ve spent on drinks so far')}:</p>
                <h2 className="bw">{t('$')}{toMoney(metrics.ctc, metrics.ctc/10000 > 1)}</h2>
            </Card>
            <Card className="limit" style={{backgroundPositionY: (100 - parseInt((metrics.td / authUser.profile.limit) * 100)) * 2.7}}>
                <h3 className="bw">{parseInt((metrics.td / authUser.profile.limit) * 100)}%</h3>
                <p>{t('to your max number of drinks this month')}</p>
            </Card>
            <Card className="total">
                <h2 className="bw">{metrics.td}</h2>
                <p>{t('drinks this month')}</p>
            </Card>
            <DailyHeatMap data={hourlyMetric} width={width} />
            <TimeBarGraphs data={hourlyMetric} width={width} />
        </div>
    );
}

export default Dashboard;
