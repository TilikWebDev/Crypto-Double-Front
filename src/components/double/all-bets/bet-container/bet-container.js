import React from 'react';
import s from './bet-container.module.css';

const BetContainer = (props) => {
    
    let text = 'Ставка на 0';
    let color = s.green;
    let status = s.default;

    if (props.status === 'win') {
        status = s.win;
    }

    if (props.status === 'lose') {
        status = s.lose;
    }

    if (props.color === 'red') {
        text = 'Ставка на 1 к 7';
        color = s.red;
    }

    if (props.color === 'black') {
        text = 'Ставка на 8 к 14';
        color = s.black;
    }

    let my_bets_classname = (props.user_total_amount) ? status : s.default;

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
                    Моя ставка
                    <span className={s.bet + ' ' + my_bets_classname}>{props.user_total_amount}</span>
                </p>
            </div>
            
            <div className={s.child}>
                <p className={s.total}>
                    Общие ставки
                    <span className={s.total_amount + ' ' + status}>{props.total_amount}</span>
                </p>

                <p className={s.no_bets}>Ставок нет</p>

                <div className={s.body}>
                    {bets}
                </div>
            </div>
        </div>
    )
}

export default BetContainer;