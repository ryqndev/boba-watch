import React, {useState, useEffect} from 'react';
import Utils from '../textUtil.js';
import DailyHeatMap from '../graphs/DailyHeatMap';
import TimeBarGraphs from '../graphs/TimeBarGraphs';
import UserSunburst from '../graphs/UserSunburst';
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
    useEffect(() => {
        stats.resetMonthly();
    }, []);
    return (
        <div className="dashboard-page">
            <h4 className="title">Monthly Spending</h4>
            <div className="card" id="chart-holder">
                <div className="description">
                    MONTHLY LIMIT: ${Utils.toMoney(budget, budget/10000 > 1)}
                    <br />
                    <span>${Utils.toMoney(metrics.tc, metrics.tc/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(budget - metrics.tc)}
                </div>
                <UserSunburst budget={budget} metrics={metrics}/>
            </div>
            <div className="card budget">
                <p>This is how much you’ve spent on drinks so far:</p>
                <h2>${Utils.toMoney(cmetrics.tc, cmetrics.tc/10000 > 1)}</h2>
            </div>
            <div className="card limit" style={{backgroundPositionY: (100 - drinkPercent) * 2.7}}>
                <h3>{drinkPercent}%</h3>
                <p>to your max number of drinks this month</p>
            </div>
            <div className="card total">
                <h2>{metrics.td}</h2>
                <p>drinks this month</p>
            </div>
            <DailyHeatMap data={cmetrics.d} width={width}/>
            <TimeBarGraphs width={width} data={cmetrics.d} />
        </div>
    );
}

export default Dashboard;
