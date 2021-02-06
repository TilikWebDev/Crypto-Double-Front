import React from 'react';
import s from './all-bets.module.css';

import BetContainer from './bet-container/bet-container';
import PropTypes from 'prop-types';

const AllBets = ({total_bet_data, bet_container, onChangeBetAmount, onCreateBet}) => {

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

    total_bet_data.map((b) => {
        b.amount = parseInt(b.amount);
        switch (b.color) {
            case 'red':
                if (b.email) {
                    red_data.bets.push({email: b.email, amount: b.amount});
                    red_data.total_amount += parseFloat(b.amount);
                } else {
                    red_data.user_total_amount += b.amount;
                } 
                break;

            case 'black':
                if (b.email) {
                    black_data.bets.push({email: b.email, amount: b.amount});
                    black_data.total_amount += parseFloat(b.amount);
                } else {
                    black_data.user_total_amount += b.amount;
                } 
                break;

            default: 
                if (b.email) {
                    green_data.bets.push({email: b.email, amount: b.amount});
                    green_data.total_amount += parseFloat(b.amount);
                } else {
                    green_data.user_total_amount += b.amount;
                }
                break;
        }

        return true;
    })

    return (
        <div className={s.main}>
            <BetContainer 
                status={bet_container.red}
                onChangeBetAmount={onChangeBetAmount} 
                onCreateBet={onCreateBet} 
                color="red" 
                total_amount={red_data.total_amount} 
                user_total_amount={red_data.user_total_amount} 
                data={red_data.bets}
            />

            <BetContainer 
                status={bet_container.green}
                onChangeBetAmount={onChangeBetAmount} 
                onCreateBet={onCreateBet} 
                color="green" 
                total_amount={green_data.total_amount} 
                user_total_amount={green_data.user_total_amount} 
                data={green_data.bets}
            />

            <BetContainer 
                status={bet_container.black}
                onChangeBetAmount={onChangeBetAmount} 
                onCreateBet={onCreateBet} 
                color="black" 
                total_amount={black_data.total_amount} 
                user_total_amount={black_data.user_total_amount} 
                data={black_data.bets}
            />
        </div>
    );
};

AllBets.propTypes = {
    total_bet_data: PropTypes.array, 
    bet_container: PropTypes.object, 
    onChangeBetAmount: PropTypes.func, 
    onCreateBet: PropTypes.func
}

export default AllBets;