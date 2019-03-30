import React, { Component } from 'react';
import {PieChart, Pie, ResponsiveContainer} from 'recharts';
import {Typography, Card} from '@material-ui/core';
import './styles/dashboard.css';

const data = [
    {
        "name": "Left",
        "value": 38,
        "fill": "#cccccc"
    },
    {
        "name": "Used",
        "value": 64
    }
];
const amount = 4.23;
export class Dashboard extends Component {
    render() {
        return (
        <div className="dashboard-page">
            <Typography variant="h4">Monthly Spending</Typography>
            <Card className="chart-holder">
            <ResponsiveContainer height="100%" width="100%">
                <PieChart width={730} height={250}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#2DA08E" stopOpacity={1}/>
                        <stop offset="90%" stopColor="#aaFF88" stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="url(#colorUv)" label={false} startAngle={90} endAngle={450} paddingAngle={2}/>
                    <svg viewBox="0 0 500 500">
                        <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"  fillOpacity="0"/>
                        <text width="500">
                            <textPath href="#curve">
                                Total Amount Spent ${amount}
                            </textPath>
                        </text>
                    </svg>
                </PieChart>
            </ResponsiveContainer>
            </Card>
        </div>
        )
    }
}

export default Dashboard
