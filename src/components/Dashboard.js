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
            animation: true,
            children:[
                {
                    title: "Padding",
                    size: 0,
                    color: "#FFFFFF",
                    animation: false
                }
            ]
        },
        {
            title: "Until Limit",
            size: 25,
            color: "#F4F4F4",
            animation: true
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
function getDailyTotal(metrics){
    let totals = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}];
    return totals;
}

export class Dashboard extends Component {
    /**
     * @constructor
     * TODO: make user settings a localstorage object
     */
    constructor(props) {
        super(props);
        if(this.props.accessToken === 0){
            window.location.href = window.origin.toString();
        }
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        const drinkTotal = 15;
        this.state = {
            totalMoney: metrics.totalCost,
            totalDrinks: metrics.numDrinks,
            drinkPercentage: parseInt((metrics.numDrinks/drinkTotal) * 100),
            userDrinkTotal: drinkTotal,
            userCostTotal: 75,
            monthSpendData: getDailyTotal(metrics),
            time: getDailyData(metrics)
        };
        fetch(`https://api.boba.watch/users/${this.props.userId}/${this.props.accessToken}`
        ).then(resp => {
            return resp.json();
        }).then(resp => {
            this.setState({
                userCostTotal: resp.budget == null ? 100 : resp.budget,
                userDrinkTotal: resp.maxDrinks == null ? 15 : resp.maxDrinks
            });
        }).catch(err => {
            swal("Error!", "I had trouble getting your settings.", "error");
        });
    };
    updateInfo = () => {
        fetch("https://api.boba.watch/drinks/user/" + this.props.userid, {
        }).then((resp) => { return resp.json();
        }).then((resp) => { stats.recalculateMetrics(resp);
        }).catch(err => { swal("Error!", `Couldn't update data. Try again later! \nError: ${err}`, "error");
        });
    };
    render() {
        let width = window.innerWidth - 40;
        return (
        <div className="dashboard-page">
            <Typography variant="h4">Monthly Spending</Typography>
            <Card className="chart-holder">
                <div className="chard-holder-description">
                    MONTHLY LIMIT: ${this.state.userCostTotal}
                    <br />
                    <span>${Utils.toMoney(this.state.totalMoney, this.state.totalMoney/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(this.state.userCostTotal*100 - this.state.totalMoney)}
                </div>
                <Sunburst height={width-45} width={width-45} data={sunburstData} padAngle={0.06} colorType={'literal'} />
            </Card>
            <div className="stats-holder">
                <Card className="month-total-money">
                    <p>This is how much you’ve spent on boba this month:</p>
                    <Typography variant="h2">${Utils.toMoney(this.state.totalMoney, this.state.totalMoney/10000 > 1)}</Typography>
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
