import React from 'react';
import s from './bet-container.module.css';

const BetContainer = (props) => {
    
    let text = 'Bet on 0';
    let color = s.green;

    if (props.color === 'red') {
        text = 'Bet on 1 to 7';
        color = s.red;
    }

    if (props.color === 'black') {
        text = 'Bet on 8 to 14';
        color = s.black;
    }

    let bets = props.data.sort((a, b) => a.amount > b.amount ? -1 : 1).map((b, index) => 
        <div key={index}><span>{b.email}</span><p onClick={() => props.onChangeBetAmount(b.amount)}>{b.amount}</p></div>
    );

    return (
        <div className={ s.main + ' ' + color}>
            <div className={s.child}>
                <div className={s.head}>
                    <button onClick={ () => props.onCreateBet(props.color) }>{text}</button>
                </div>
                
                <p className={s.container}>
                    My bet
                    <span className={s.bet}>{props.user_total_amount}</span>
                </p>
            </div>
            
            <div className={s.child}>
                <p className={s.total}>
                    Total bet
                    <span>{props.total_amount}</span>
                </p>

                <p className={s.no_bets}>No bets</p>

                <div className={s.body}>
                    {bets}
                </div>
            </div>
        </div>
    )
}

export default BetContainer;