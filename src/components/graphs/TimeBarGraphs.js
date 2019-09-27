import React, { Component } from 'react';
import {Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend } from 'react-vis';
import 'react-vis/dist/style.css';
import './styles/timebargraphs.css'

let shortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export class TimeBarGraphs extends Component {
    constructor(props){
        super(props);
        this.state = this.parse(this.props.data);
    }
    parse = (data) => {
        let bd = { morn: [], noon: [] }
        data.forEach((day, i) => {
            let morn = 0, noon = 0;
            day.forEach((quantityAtTime, j) => {
                j >= 11 ? noon += quantityAtTime : morn += quantityAtTime ;
            });
            bd.morn.push({x: shortName[i], y: morn});
            bd.noon.push({x: shortName[i], y: noon});
            
        });
        return bd;
    }
    render() {
        const s = this.state;
        return (
            <Card className="time-bar-graph--holder">
                <XYPlot width={this.props.width - 40} height={300} stackBy="y" xType="ordinal">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis title={'# of purchases'}/>
                <VerticalBarSeries color={'#FFACAC'} data={s.morn} />
                <VerticalBarSeries color={'#FFDCDC'} data={s.noon} />
                </XYPlot>
                <DiscreteColorLegend
                    style={{ textAlign:'center'}}
                    orientation="horizontal"
                    items={
                        [
                            {
                                title: 'Morning Purchases',
                                color: '#FFACAC',
                                strokeWidth: '5px'
                            },
                            {
                                title: 'Afternoon Purchases',
                                color: '#FFDCDC',
                                strokeWidth: '5px'
                            }
                        ]
                    }
                />
            </Card>
        )
    }
}

export default TimeBarGraphs;