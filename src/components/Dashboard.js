import React, { Component } from 'react';
import {Typography, Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HeatmapSeries, Sunburst } from 'react-vis';
import Utils from './textUtil.js';
import stats from './calculateStatistics.js';
import swal from 'sweetalert';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';

const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const times = [ "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM" ,
                "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM" ];

const sunburstData = {
    title: "$3253",
    size: 0,
    color: "#FFFFFF",
    animation: true,
    children: [
        {
            title: "Progress",
            size: 75,
            color: "#32de44",
            animation: {damping: 9, stiffness: 300},
            children:[
                {
                    title: "Padding",
                    size: 0,
                    color: "#FFFFFF",
                    animation: {damping: 9, stiffness: 300}
                }
            ]
        },
        {
            title: "Until Limit",
            size: 25,
            color: "#F4F4F4",
            animation: {damping: 9, stiffness: 300}
        }
    ]
}
function getDailyData(metrics){
    let dailyGraph = [];
    let maxes = [];
    metrics.drinks.forEach(day => {maxes.push(Math.max.apply(null, day))});
    let max = Math.max.apply(null, maxes);
    metrics.drinks.forEach((day, i) => {
        day.forEach((time, j) => {
            dailyGraph.push({ x: days[i], y: times[j], color: `rgba(246, 128, 128, ${time === 0 ? 0.1 : (time)/max})`});
        });
    });
    return dailyGraph;  
}
export class Dashboard extends Component {
    constructor(props) {
        super(props);
        if(this.props.accessToken === 0){
            window.location.href = window.origin.toString();
        }
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        const drinkTotal = localStorage.getItem('userDrinkMax');
        this.state = {
            totalMoney: metrics.totalCost,
            totalDrinks: metrics.numDrinks,
            drinkPercentage: parseInt((metrics.numDrinks/drinkTotal) * 100),
            userDrinkMax: drinkTotal,
            userSpendMax: localStorage.getItem('userSpendMax'),
            time: getDailyData(metrics)
        };
    };
    update = () => {
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        const drinkTotal = localStorage.getItem('userDrinkMax');
        this.setState({
            totalMoney: metrics.totalCost,
            totalDrinks: metrics.numDrinks,
            drinkPercentage: parseInt((metrics.numDrinks/drinkTotal) * 100),
            userDrinkMax: drinkTotal,
            userSpendMax: localStorage.getItem('userSpendMax'),
            time: getDailyData(metrics)
        });
    }
    render() {
        let width = window.innerWidth - 40;
        return (
        <div className="dashboard-page">
            <Typography variant="h4">Monthly Spending</Typography>
            <Card className="chart-holder">
                <div className="chard-holder-description">
                    MONTHLY LIMIT: ${this.state.userSpendMax}
                    <br />
                    <span>${Utils.toMoney(this.state.totalMoney, this.state.totalMoney/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(this.state.userSpendMax*100 - this.state.totalMoney)}
                </div>
                <Sunburst height={width-45} width={width-45} data={sunburstData} padAngle={0.06} animation colorType={'literal'} />
            </Card>
            <div className="stats-holder">
                <Card className="month-total-money">
                    <p>This is how much you’ve spent on boba this month:</p>
                    <Typography variant="h2">${Utils.toMoney(this.state.totalMoney, this.state.totalMoney/10000 > 1)}</Typography>
                </Card>
                <Card className="month-drink-limit" style={{backgroundPositionY: (100 - this.state.drinkPercentage) * 3}}>
                    <Typography variant="h3">{this.state.drinkPercentage}%</Typography>
                    <p>to your max number of drinks this month</p>
                </Card>
                <Card className="month-total-drinks">
                    <Typography variant="h2">{this.state.totalDrinks}</Typography>
                    <p>drinks this month</p>
                </Card>
            </div>
            <Card className="daily-chart">
                <XYPlot xType="ordinal" yType="ordinal" margin={60} width={width} height={1.8*width}>
                <XAxis orientation="top" />
                <YAxis />
                <HeatmapSeries
                    colorType="literal"
                    style={{
                        stroke: 'white',
                        strokeWidth: '2px',
                        rectStyle: {
                            rx: 10,
                            ry: 10
                        }
                    }}
                    data={this.state.time}
                    />
                </XYPlot>
            </Card>
        </div>
        )
    }
}

export default Dashboard
