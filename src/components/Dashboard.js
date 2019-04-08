import React, { Component } from 'react';
import {Typography, Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, HeatmapSeries } from 'react-vis';
import Utils from './textUtil.js';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = [ "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM" ,
                "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM" ]

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
function getDailyTotal(metrics){
    let totals = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}];
    return totals;
}

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        this.state = {
            totalMoney: metrics.totalCost,
            totalDrinks: metrics.numDrinks,
            drinkPercentage: 70,
            monthSpendData: getDailyTotal(metrics),
            time: getDailyData(metrics)
        };
    };
    render() {
        let width = window.innerWidth - 40;
        return (
        <div className="dashboard-page">
            <Typography variant="h4">Monthly Spending</Typography>
            <Card className="chart-holder">
                <XYPlot height={width-45} width={width-30} margin={40}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <LineSeries data={this.state.monthSpendData} />
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </Card>
            <div className="stats-holder">
                <Card className="month-total-money">
                    <p>This is how much you’ve spent on boba this month:</p>
                    <Typography variant="h2">${Utils.toMoney(this.state.totalMoney)}</Typography>
                </Card>
                <Card className="month-drink-limit">
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
