import React, {useState, useEffect} from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend } from 'react-vis';
import Card from '../styles/Card';
import 'react-vis/dist/style.css';
import './styles/timebargraphs.css'

let shortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TimeBarGraphs = ({width, data}) => {
    const [morning, setMorning] = useState([]);
    const [noon, setNoon] = useState([]);

    useEffect(() => {
        let m = [];
        let n = [];
        data.forEach((day, i) => {
            let morn = 0, noon = 0;
            day.forEach((quantityAtTime, j) => {
                j >= 11 ? noon += quantityAtTime : morn += quantityAtTime;
            });
            m.push({x: shortName[i], y: morn});
            n.push({x: shortName[i], y: noon});
            setMorning(m);
            setNoon(n);
        });
    }, [data, setMorning, setNoon]);

    return (
        <Card className="time-bar-graph--holder">
            <XYPlot width={width - 40} height={300} stackBy="y" xType="ordinal">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis title={'# of purchases'}/>
            <VerticalBarSeries color={'#FFACAC'} data={morning} />
            <VerticalBarSeries color={'#FFDCDC'} data={noon} />
            </XYPlot>
            <DiscreteColorLegend
                style={{ textAlign:'center'}}
                orientation="horizontal"
                items={
                    [{
                        title: 'Morning Purchases',
                        color: '#FFACAC',
                        strokeWidth: 5
                    },
                    {
                        title: 'Afternoon Purchases',
                        color: '#FFDCDC',
                        strokeWidth: 5
                    }]
                }
            />
        </Card>
    );
}

export default TimeBarGraphs;