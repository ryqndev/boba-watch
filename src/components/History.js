import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DrinkPanel from './DrinkPanel';
import Utils from './textUtil.js';
import stats from './calculateStatistics';
import swal from 'sweetalert';
import './styles/history.css';

export class History extends Component {
    state = {
        drinks: [<Typography variant="h3" key={1}>No Drinks</Typography>],
        sum: 0
    };
    componentDidMount = () => {
        this.generate();
    }
    retrieveHistory = () => {
        fetch("https://api.boba.watch/drinks/user/" + this.props.userId,{
        }).then((resp) => { return resp.json();
        }).then((resp) => { 
            stats.recalculateMetrics(resp);
            swal("Done!", "Drink has been deleted", "success"); 
            this.generate();
        }).catch(err => { console.log(err);
        });   
    }
    generate = () => {
        let drinks = JSON.parse(localStorage.getItem('drinksList'));
        drinks = drinks.map(id => JSON.parse(localStorage.getItem(id)) );
        let sum = 0;
        let newDrinks = drinks.map((e, i) => {
            sum += e['price'];
            return (<DrinkPanel key={e.id} data={e} getNewInfo={this.retrieveHistory} accessToken={this.props.accessToken}/>);
        });
        this.setState({
            drinks: newDrinks,
            sum: sum
        });
    };
    
    render() {
        return (
        <div className="history-page">
            <Typography variant="h3"> Monthly Spending</Typography>
            <div id="history-spending">
                {this.state.drinks}
            </div>
            <Typography variant="h3" className="history-total"> <span>Monthly Total:</span> ${Utils.toMoney(this.state.sum)} </Typography>
        </div>
        )
    }
}

export default History;
