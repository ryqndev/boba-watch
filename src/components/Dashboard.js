import React, { Component } from 'react';
import { Typography, Card } from '@material-ui/core';
import { Sunburst } from 'react-vis';
import Utils from './textUtil.js';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';
import DailyHeatMap from './graphs/DailyHeatMap';
import TimeBarGraphs from './graphs/TimeBarGraphs';

export class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = this.getState();
    }
    getState = () => {
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
        let drinkTotal = localStorage.getItem('userDrinkMax');
        return {
            drinkPercentage: parseInt((metrics.td / drinkTotal) * 100),
            userDrinkMax: drinkTotal,
            userSpendMax: localStorage.getItem('userSpendMax'),
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
                        size: localStorage.getItem('userSpendMax') - metrics.tc,
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
            <Typography variant="h4" className="dashboard-page--title">Monthly Spending</Typography>
            <Card id="chart-holder">
                <div className="chart-holder-description">
                    MONTHLY LIMIT: ${Utils.toMoney(s.userSpendMax, s.userSpendMax/10000 > 1)}
                    <br />
                    <span>${Utils.toMoney(s.metrics.tc, s.metrics.tc/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(s.userSpendMax - s.metrics.tc)}
                </div>
                <Sunburst height={sunburstSize - (this.isLandscape() ? 105 : 45)} width={sunburstSize-45} data={s.sunburstData} padAngle={0.06} animation colorType={'literal'} />
            </Card>
            <Card className="month-total-money">
                <p>This is how much you’ve spent on drinks so far:</p>
                <Typography variant="h2">${Utils.toMoney(s.cmetrics.tc, s.cmetrics.tc/10000 > 1)}</Typography>
            </Card>
            <Card className="month-drink-limit" style={{backgroundPositionY: (100 - s.drinkPercentage) * 2.7}}>
                <Typography variant="h3">{s.drinkPercentage}%</Typography>
                <p>to your max number of drinks this month</p>
            </Card>
            <Card className="month-total-drinks">
                <Typography variant="h2">{s.metrics.td}</Typography>
                <p>drinks this month</p>
            </Card>
            <DailyHeatMap data={s.cmetrics.d} width={this.isLandscape()  ? (width / 4 + 20 )  : width}/>
            {this.isLandscape() ? ' ' : <TimeBarGraphs width={width} data={s.cmetrics.d}/>}
        </div>
        )
    }
}

export default Dashboard;
