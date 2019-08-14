import React, {
    Component
} from 'react';
import {
    Typography,
    Card
} from '@material-ui/core';
import {
    XYPlot,
    XAxis,
    YAxis,
    HeatmapSeries,
    Sunburst
} from 'react-vis';
import Utils from './textUtil.js';
import './styles/dashboard.css';
import 'react-vis/dist/style.css';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const times = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM",
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"
];

function getDailyData(metrics) {
    let dailyGraph = [];
    let maxes = [];
    metrics.d.forEach(day => {
        maxes.push(Math.max.apply(null, day))
    });
    let max = Math.max.apply(null, maxes);
    metrics.d.forEach((day, i) => {
        day.forEach((time, j) => {
            dailyGraph.push({
                x: days[i],
                y: times[j],
                color: `rgba(246, 128, 128, ${time === 0 ? 0.1 : (time)/max})`
            });
        });
    });
    return dailyGraph;
}
export class Dashboard extends Component {
    constructor(props){
        super(props);
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
        const drinkTotal = localStorage.getItem('userDrinkMax');
        this.state = {
            totalCost: metrics.tc,
            totalDrinks: metrics.td,
            drinkPercentage: parseInt((metrics.td / drinkTotal) * 100),
            userDrinkMax: drinkTotal,
            userSpendMax: localStorage.getItem('userSpendMax'),
            time: getDailyData(cmetrics),
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
            screenWidth: window.innerWidth - 40
        }
    }
    update = () => {
        let metrics = JSON.parse(localStorage.getItem('metrics'));
        let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
        const drinkTotal = localStorage.getItem('userDrinkMax');
        this.setState({
            totalCost: metrics.tc,
            totalDrinks: metrics.td,
            drinkPercentage: parseInt((metrics.td / drinkTotal) * 100),
            userDrinkMax: drinkTotal,
            userSpendMax: localStorage.getItem('userSpendMax'),
            time: getDailyData(cmetrics),
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
            screenWidth: window.innerWidth - 40
        });
    }
    componentDidMount = () => { window.addEventListener( 'resize', () => {
        this.setState({screenWidth: window.innerWidth - 40});
    } )}
    render() {
        let s = this.state;
        let width = s.screenWidth;
        return (
        <div className="dashboard-page">
            <Typography variant="h4" className="dashboard-page--title">Monthly Spending</Typography>
            <Card id="chart-holder">
                <div className="chard-holder-description">
                    MONTHLY LIMIT: ${Utils.toMoney(s.userSpendMax, s.userSpendMax/10000 > 1)}
                    <br />
                    <span>${Utils.toMoney(s.totalCost, s.totalCost/10000 > 1)}</span>
                    <br />
                    REMAINING: ${Utils.toMoney(s.userSpendMax - s.totalCost)}
                </div>
                <Sunburst height={width-45} width={width-45} data={s.sunburstData} padAngle={0.06} animation colorType={'literal'} />
            </Card>
            <Card className="month-total-money">
                <p>This is how much you’ve spent on boba this month:</p>
                <Typography variant="h2">${Utils.toMoney(s.totalCost, s.totalCost/10000 > 1)}</Typography>
            </Card>
            <Card className="month-drink-limit" style={{backgroundPositionY: (100 - s.drinkPercentage) * 2.7}}>
                <Typography variant="h3">{s.drinkPercentage}%</Typography>
                <p>to your max number of drinks this month</p>
            </Card>
            <Card className="month-total-drinks">
                <Typography variant="h2">{s.totalDrinks}</Typography>
                <p>drinks this month</p>
            </Card>
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
                    data={s.time}
                    />
                </XYPlot>
            </Card>
        </div>
        )
    }
}

export default Dashboard;
