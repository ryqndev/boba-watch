import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DrinkPanel from './DrinkPanel';
import Utils from './textUtil.js';
import './styles/history.css';

export class History extends Component {
    state = {
        monthly: {
            drinks: [<div className="thaman-color"><Typography variant="h3" key={1}>No drinks this month :(</Typography></div>],
            sum: 0
        },
        complete: {
            drinks: [<div className="thaman-color"><Typography variant="h3" key={1}>Add a drink to start!</Typography></div>],
            sum: 0
        },
        monthlyDisplay: 10,
        completeDisplay: 5
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
            todayYear = today.getFullYear(),
            displayedMonthly = this.state.monthlyDisplay,
            displayedOverall = this.state.completeDisplay;
        
        drinks.forEach( ( e, i ) => {
            let drinkDate = new Date(e.date);
            if(drinkDate.getMonth() === todayMonth && drinkDate.getFullYear() === todayYear){
                if(displayedMonthly > 0 ){
                    monthlyDrinks.push((<DrinkPanel key={e.id} data={e} update={this.update} />));
                    displayedMonthly = displayedMonthly - 1;
                }
                monthlySum += parseFloat(e.price);
            }else{
                if(displayedOverall > 0 ){
                    totalDrinks.push((<DrinkPanel key={e.id} data={e} update={this.update} />));
                    displayedOverall = displayedOverall - 1;
                }
            }
            totalSum += parseFloat(e.price);
        });
        if( displayedMonthly <= 0 ){
            monthlyDrinks.push(
                <div className="thaman-color">
                <div className="history-load-more" onClick={this.displayMoreMonthly}>
                    • • •
                </div>
            </div>
            );
        }
        if( displayedOverall <= 0 ){
            totalDrinks.push(
                <div className="thaman-color">
                <div className="history-load-more" onClick={this.displayMoreOverall}>
                    • • •
                </div>
            </div>
            );
        }
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
    displayMoreMonthly = () => {
        this.setState(state => ({monthlyDisplay: state.monthlyDisplay + 10 }), this.update)
    }
    displayMoreOverall = () => {
        this.setState(state => ({completeDisplay: state.completeDisplay + 10 }), this.update)
    }
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
