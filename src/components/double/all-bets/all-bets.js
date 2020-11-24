import React from 'react';
import s from './all-bets.module.css';

import BetContainer from './bet-container/bet-container';

const AllBets = (props) => {

    let red_data = {
        bets: [],
        total_amount: 0,
        user_total_amount: 0
    };
    
    let black_data = {
        bets: [],
        total_amount: 0,
        user_total_amount: 0
    };

    let green_data = {
        bets: [],
        total_amount: 0,
        user_total_amount: 0
    };

    props.total_bet_data.map((b) => {
        b.amount = parseInt(b.amount);
        switch (b.color) {
            case 'red':
                if (b.email) {
                    red_data.bets.push({email: b.email, amount: b.amount});
                    red_data.total_amount += parseFloat(b.amount);
                } else {
                    red_data.user_total_amount += b.amount;
                } 
                return;

            case 'black':
                if (b.email) {
                    black_data.bets.push({email: b.email, amount: b.amount});
                    black_data.total_amount += parseFloat(b.amount);
                } else {
                    black_data.user_total_amount += b.amount;
                } 
                return;

            default: 
                if (b.email) {
                    green_data.bets.push({email: b.email, amount: b.amount});
                    green_data.total_amount += parseFloat(b.amount);
                } else {
                    green_data.user_total_amount += b.amount;
                }
                return;
        }
    })

    return (
        <div className={s.main}>
            <BetContainer 
                onChangeBetAmount={props.onChangeBetAmount} 
                onCreateBet={props.onCreateBet} 
                color="red" 
                total_amount={red_data.total_amount} 
                user_total_amount={red_data.user_total_amount} 
                data={red_data.bets}
            />

            <BetContainer 
                onChangeBetAmount={props.onChangeBetAmount} 
                onCreateBet={props.onCreateBet} 
                color="green" 
                total_amount={green_data.total_amount} 
                user_total_amount={green_data.user_total_amount} 
                data={green_data.bets}
            />

            <BetContainer 
                onChangeBetAmount={props.onChangeBetAmount} 
                onCreateBet={props.onCreateBet} 
                color="black" 
                total_amount={black_data.total_amount} 
                user_total_amount={black_data.user_total_amount} 
                data={black_data.bets}
            />
        </div>
    );
};

export default AllBets;