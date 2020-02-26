import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Sunburst } from 'react-vis';
import Utils from '../textUtil.js';
import DailyHeatMap from '../graphs/DailyHeatMap';
import TimeBarGraphs from '../graphs/TimeBarGraphs';
import stats from '../calculateStatistics';
import './Dashboard.scss';
import '../globals/globals.scss';
import 'react-vis/dist/style.css';

export class Dashboard extends Component {
    constructor(props){
        super(props);
        stats.resetMonthly();
        this.state = this.getState();
    }
    getState = () => {
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
        let drinkTotal = localStorage.getItem('limit');
        return {
            drinkPercentage: parseInt((metrics.td / drinkTotal) * 100),
            limit: drinkTotal,
            budget: localStorage.getItem('budget'),
            sunburstData: {
                size: 0,
                color: "#FFFFFF",
                children: [{
                        title: "Progress",
                        size: metrics.tc,
                        color: "#32de44",
                        children: [{
                            title: "Padding",
                            size: 0,
                            color: "#FFFFFF",
                        }]
                    },
                    {
                        title: "Until Limit",
                        size: localStorage.getItem('budget') - metrics.tc,
                        color: "#F4F4F4",
                    }
                ]
            },
            metrics: metrics,
            cmetrics: cmetrics,
            screenWidth: window.innerWidth - 40
        };
    }
    update = () => {
        this.setState(this.getState());
    }
    componentDidMount = () => { window.addEventListener( 'resize', () => {
        this.setState({screenWidth: window.innerWidth - 40});
    })}
    isLandscape = () => {
        return (window.innerWidth / window.innerHeight) > ( 1.625 ) && window.innerHeight > 700 && window.innerWidth > 1200;
    }
    render() {
        let s = this.state;
        let width = s.screenWidth;
        let sunburstSize =  this.isLandscape() ? (window.innerHeight * 0.9) : width;
        return (
        <div className="dashboard-page">
            <Typography variant="h4" className="title">Monthly Spending</Typography>
            <div className="card" id="chart-holder">
                <div className="description">
                    MONTHLY LIMIT: ${Utils.toMoney(s.budget, s.budget/10000 > 1)}
                    <br />
                    <span>${Utils.toMoney(s.metrics.tc, s.metrics.tc/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(s.budget - s.metrics.tc)}
                </div>
                <Sunburst height={sunburstSize - (this.isLandscape() ? 105 : 45)} width={sunburstSize-45} data={s.sunburstData} padAngle={0.06} animation colorType={'literal'} />
            </div>
            <div className="card budget">
                <p>This is how much you’ve spent on drinks so far:</p>
                <h2>${Utils.toMoney(s.cmetrics.tc, s.cmetrics.tc/10000 > 1)}</h2>
            </div>
            <div className="card limit" style={{backgroundPositionY: (100 - s.drinkPercentage) * 2.7}}>
                <Typography variant="h3">{s.drinkPercentage}%</Typography>
                <p>to your max number of drinks this month</p>
            </div>
            <div className="card total">
                <h2>{s.metrics.td}</h2>
                <p>drinks this month</p>
            </div>
            <DailyHeatMap data={s.cmetrics.d} width={this.isLandscape()  ? (width / 4 + 20 )  : width}/>
            {this.isLandscape() ? ' ' : <TimeBarGraphs width={width} data={s.cmetrics.d} />}
        </div>
        )
    }
}

export default Dashboard;
