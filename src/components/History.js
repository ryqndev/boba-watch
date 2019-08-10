import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DrinkPanel from './DrinkPanel';
import Utils from './textUtil.js';
import './styles/history.css';

export class History extends Component {
    state = {
        monthly: {
            drinks: [<Typography variant="h3" key={1}>No drinks to display :(</Typography>],
            sum: 0
        },
        complete: {
            drinks: [<Typography variant="h3" key={1}>No drinks to display :(</Typography>],
            sum: 0
        },
        display: {
            monthly: 5,
            complete: 10
        }
    };
    componentDidMount(){
        this.update();
    }
    update = () => {
        let drinks = JSON.parse(localStorage.getItem('drinkids'));
        if(!Array.isArray(drinks) || !drinks.length) return;
        drinks = drinks.map(id => JSON.parse(localStorage.getItem(id)) );
        let monthlyDrinks = [],
            totalDrinks = [],
            monthlySum = 0,
            totalSum = 0,
            today = new Date(),
            todayMonth = today.getMonth(),
            todayYear = today.getFullYear();
        
        drinks.forEach( e => {
            let drinkDate = new Date(e.date);
            if(
                drinkDate.getMonth() === todayMonth &&
                drinkDate.getFullYear() === todayYear
            ){
                monthlyDrinks.push((<DrinkPanel key={e.id} data={e} update={this.update} />));
                monthlySum += e.price;
            }
            totalDrinks.push((<DrinkPanel key={e.id} data={e} update={this.update} />));
            totalSum += e.price;
        });
        this.setState({
            monthly: {
                drinks: monthlyDrinks,
                sum: monthlySum
            },
            complete: {
                drinks: totalDrinks,
                sum: totalSum
            }
        });
    };
    
    render() {
        return (
        <div className="history-page">
            <Typography variant="h3"> Monthly Spending</Typography>
            <div className="history-spending">
                {this.state.monthly.drinks}
            </div>
            <Typography variant="h3" className="history-total">
                <span>Monthly Total:</span> ${Utils.toMoney(this.state.monthly.sum)}
            </Typography>
            <br />
            <br />
            <Typography variant="h3"> Overall Spending</Typography>
            <div className="history-spending">
                {this.state.complete.drinks}
            </div>
            <Typography variant="h3" className="history-total">
                <span>Complete Total:</span> ${Utils.toMoney(this.state.complete.sum)}
            </Typography>
        </div>
        )
    }
}

export default History;
