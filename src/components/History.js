import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DrinkPanel from './DrinkPanel';
import './styles/history.css';


export class History extends Component {
    state = {
        drinks: [<Typography variant="h3" key={1}>no u</Typography>]
    }
    componentDidMount = () => {
        this.retrieveHistory();  
    };
    retrieveHistory = () => {
        fetch("http://35.235.110.247/drinks/user/1",{
        }).then((resp) => { return resp.json();
        }).then((resp) => { this.generate(resp);
        }).catch(err => { console.log(err)
        });
    }
    generate = (drinks) => {
        let newDrinks = drinks.map((e, i) => {
            return (<DrinkPanel key={i} data={e}/>);
        });
        this.setState({
            drinks: newDrinks
        });
    };
    
    render() {
        let drinkList = this.state.drinks;
        return (
        <div className="history-page">
            <Typography variant="h3"> Monthly Spending</Typography>
            <div id="history-spending">
                {drinkList}
            </div>
            <Typography variant="h4"> Monthly Total: </Typography>
        </div>
        )
    }
}

export default History;
