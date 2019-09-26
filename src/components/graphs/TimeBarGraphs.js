import React, { Component } from 'react';
import {Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis';
import 'react-vis/dist/style.css';
import './styles/timebargraphs.css'

let morningDailyData = [{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}]
let afternoonDailyData = [{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}]

export class TimeBarGraphs extends Component {
    constructor(props){
        super(props);
        this.parse(this.props.data);
    }
    parse = (data) => {
        data.forEach(day => {

        })
    }
    render() {
        return (
            <Card className="time-bar-graph--holder">
                <XYPlot width={this.props.width - 40} height={300} stackBy="y">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries color={'#FFACAC'} data={morningDailyData} />
                <VerticalBarSeries color={'#FFDCDC'} data={afternoonDailyData} />
                </XYPlot>
            </Card>
        )
    }
}

export default TimeBarGraphs;