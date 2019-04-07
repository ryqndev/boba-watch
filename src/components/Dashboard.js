import React, { Component } from 'react';
import {Typography, Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, HeatmapSeries, LabelSeries, Hint} from 'react-vis';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = [ "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM" ,
                "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM" ]
const data = [
    {x: "Mon", y: 8},
    {x: "Tue", y: 5},
    {x: "Wed", y: 4},
    {x: "Thu", y: 9},
    {x: "Fri", y: 1},
    {x: "Sat", y: 7},
    {x: "Sun", y: 6}
];
function getDailyData(){
    let metrics = JSON.parse(localStorage.getItem('metrics'));
    let dailyGraph = [];
    console.log(metrics.drinks);
    metrics.drinks.forEach((day, i) => {
        day.forEach((time, j) => {
            dailyGraph.push({y: times[j], x: days[i], color: `rgba(246, 128, 128, ${time/5})`});
        });
    });
    return dailyGraph;  
}
/**
 * REVIEW change data calculation
 */
// x: JSON.parse(localStorage.getItem('metrics')).m,
// y: JSON.parse(localStorage.getItem('metrics'))
// JSON.parse(localStorage.getItem('metrics'));
// let datetimeData = [
//     {x: 0, y: 0},
//     {x: 1, y: 1},
//     {x: 2, y: 2},
//     {x: 3, y: 1},
//     {x: 4, y: 4},
//     {x: 5, y: 24},
//     {x: 5, y: 24},
//     {x: 6, y: 4},
// ]

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            totalMoney: 200,
            totalDrinks: 12,
            drinkPercentage: 70,
            time: getDailyData()
        };
    };
    render() {
        return (
        <div className="dashboard-page">
            <Typography variant="h4">Monthly Spending</Typography>
            <Card className="chart-holder">
                <XYPlot height={330} width={320}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <LineSeries data={data} />
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </Card>
            <div className="stats-holder">
                <Card className="month-total-money">
                    <p>This is how much you’ve spent on boba this month:</p>
                    <Typography variant="h2">${this.state.totalMoney}</Typography>
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
                <XYPlot
                    xType="ordinal"
                    yType="ordinal"
                    margin={50}
                    width={330}
                    height={500}
                    >
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
                    className="heatmap-series-example"
                    data={this.state.time}
                    onValueMouseOver={v => this.setState({value: v})}
                    onSeriesMouseOut={v => this.setState({value: false})}
                    />
                <LabelSeries
                    style={{pointerEvents: 'none'}}
                    data={this.state.time}
                    labelAnchorX="middle"
                    labelAnchorY="baseline"
                    />
                </XYPlot>
            </Card>
        </div>
        )
    }
}

export default Dashboard
