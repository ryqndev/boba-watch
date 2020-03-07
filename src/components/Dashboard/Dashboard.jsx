import React, {useState, useEffect} from 'react';
import Utils from '../textUtil.js';
import DailyHeatMap from '../graphs/DailyHeatMap';
import TimeBarGraphs from '../graphs/TimeBarGraphs';
import UserSunburst from '../graphs/UserSunburst';
import Card from '../styles/Card';
import stats from '../calculateStatistics';
import FirebaseUser from '../firebaseCalls.js';
import './Dashboard.scss';
import '../globals/globals.scss';
import 'react-vis/dist/style.css';

const Dashboard = () => {
    const [metrics, setMetrics] = useState(JSON.parse(localStorage.getItem('metrics')));
    const [cmetrics, setCmetrics] = useState(JSON.parse(localStorage.getItem('completeMetrics')));
    const [drinkPercent, setdrinkPercent] = useState(parseInt((metrics.td / FirebaseUser.get.current.profile.limit) * 100));
    const [width, setWidth] = useState(window.innerWidth - 40);
    const budget = FirebaseUser.get.current.profile.budget;
    const resize = () => {setWidth(window.innerWidth - 40)}
    useEffect(() => {
        stats.resetMonthly();
    }, []);
    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => {window.removeEventListener('resize', resize)}
    }, [setWidth]);
    return (
        <div className="dashboard-page">
            <h4 className="bw title">Monthly Spending</h4>
            <Card id="chart-holder">
                <div className="description">
                    MONTHLY LIMIT: ${Utils.toMoney(budget, budget/10000 > 1)}
                    <br />
                    <span>${Utils.toMoney(metrics.tc, metrics.tc/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(budget - metrics.tc)}
                </div>
                <UserSunburst budget={budget} spent={metrics.tc} width={width}/>
            </Card>
            <Card className="budget">
                <p>This is how much you’ve spent on drinks so far:</p>
                <h2 className="bw">${Utils.toMoney(cmetrics.tc, cmetrics.tc/10000 > 1)}</h2>
            </Card>
            <Card className="limit" style={{backgroundPositionY: (100 - drinkPercent) * 2.7}}>
                <h3 className="bw">{drinkPercent}%</h3>
                <p>to your max number of drinks this month</p>
            </Card>
            <Card className="total">
                <h2 className="bw">{metrics.td}</h2>
                <p>drinks this month</p>
            </Card>
            <DailyHeatMap data={cmetrics.d} width={width} />
            <TimeBarGraphs width={width} data={cmetrics.d} />
        </div>
    );
}

export default Dashboard;
