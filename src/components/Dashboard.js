import React, { Component } from 'react';
import {Typography, Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HeatmapSeries, Sunburst } from 'react-vis';
import Utils from './textUtil.js';
import backend from './firebaseCalls';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';

const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const times = [ "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM" ,
                "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM" ];


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
        // let metrics = JSON.parse(localStorage.getItem('metrics'));
        // const drinkTotal = localStorage.getItem('userDrinkMax');
        this.state = {
        //     totalCost: metrics.totalCost,
        //     totalDrinks: metrics.totalDrinks,
        //     drinkPercentage: parseInt((metrics.totalDrinks/drinkTotal) * 100),
        //     userDrinkMax: drinkTotal,
        //     userSpendMax: localStorage.getItem('userSpendMax'),
        //     time: getDailyData(metrics),
        //     sunburstData : {
        //         size: 0,
        //         color: "#FFFFFF",
        //         children: [
        //             {
        //                 title: "Progress",
        //                 size: metrics.totalCost,
        //                 color: "#32de44",
        //                 children:[
        //                     {
        //                         title: "Padding",
        //                         size: 0,
        //                         color: "#FFFFFF",
        //                     }
        //                 ]
        //             },
        //             {
        //                 title: "Until Limit",
        //                 size: localStorage.getItem('userSpendMax') - metrics.totalCost,
        //                 color: "#F4F4F4",
        //             }
        //         ]
        //     }
        };
    }
    update = () => {
        // let metrics = JSON.parse(localStorage.getItem('metrics'));
        // const drinkTotal = localStorage.getItem('userDrinkMax');
        // this.setState({
        //     totalCost: metrics.totalCost,
        //     totalDrinks: metrics.totalDrinks,
        //     drinkPercentage: parseInt((metrics.totalDrinks/drinkTotal) * 100),
        //     userDrinkMax: drinkTotal,
        //     userSpendMax: localStorage.getItem('userSpendMax'),
        //     time: getDailyData(metrics),
        //     sunburstData : {
        //         size: 0,
        //         color: "#FFFFFF",
        //         children: [
        //             {
        //                 title: "Progress",
        //                 size: metrics.totalCost,
        //                 color: "#32de44",
        //                 children:[
        //                     {
        //                         title: "Padding",
        //                         size: 0,
        //                         color: "#FFFFFF",
        //                     }
        //                 ]
        //             },
        //             {
        //                 title: "Until Limit",
        //                 size: localStorage.getItem('userSpendMax') - metrics.totalCost,
        //                 color: "#F4F4F4",
        //             }
        //         ]
        //     }
        // });
    }
    render() {
        let width = window.innerWidth - 40;
        return (
        <div className="dashboard-page">
            <Typography variant="h4" className="dashboard-page--title">Monthly Spending</Typography>
            <Card className="chart-holder">
                <div className="chard-holder-description">
                    {/* MONTHLY LIMIT: ${Utils.toMoney(this.state.userSpendMax, this.state.userSpendMax/10000 > 1)} */}
                    <br />
                    {/* <span>${Utils.toMoney(this.state.totalCost, this.state.totalCost/10000 > 1)}</span> */}
                    <br />
                    {/* REMAINING: ${Utils.toMoney(this.state.userSpendMax - this.state.totalCost)} */}
                </div>
                {/* <Sunburst height={width-45} width={width-45} data={this.state.sunburstData} padAngle={0.06} animation colorType={'literal'} /> */}
            </Card>
            <Card className="month-total-money">
                <p>This is how much you’ve spent on boba this month:</p>
                {/* <Typography variant="h2">${Utils.toMoney(this.state.totalCost, this.state.totalCost/10000 > 1)}</Typography> */}
            </Card>
            {/* <Card className="month-drink-limit" style={{backgroundPositionY: (100 - this.state.drinkPercentage) * 2.7}}> */}
                {/* <Typography variant="h3">{this.state.drinkPercentage}%</Typography> */}
                <p>to your max number of drinks this month</p>
            {/* </Card> */}
            <Card className="month-total-drinks">
                {/* <Typography variant="h2">{this.state.totalDrinks}</Typography> */}
                <p>drinks this month</p>
            </Card>
            <Card className="daily-chart">
                <XYPlot xType="ordinal" yType="ordinal" margin={60} width={width} height={1.8*width}>
                <XAxis orientation="top" />
                <YAxis />
                {/* <HeatmapSeries
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
                    /> */}
                </XYPlot>
            </Card>
        </div>
        )
    }
}

export default Dashboard;
