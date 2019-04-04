import React, { Component } from 'react';
import {Typography, Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';

const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
];

export class Dashboard extends Component {
    state = {
        totalMoney: 200,
        totalDrinks: 12,
        drinkPercentage: 70
    }
    
    render() {
        return (
        <div className="dashboard-page">
            <Typography variant="h4">Monthly Spending</Typography>
            <Card className="chart-holder">
                <XYPlot height={300} width={900}>
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
        </div>
        )
    }
}

export default Dashboard
