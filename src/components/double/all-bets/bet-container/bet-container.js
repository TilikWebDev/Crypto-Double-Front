import React from 'react';
import s from './bet-container.module.css';

import PropTypes from 'prop-types';

const BetContainer = ({status, color, user_total_amount, total_amount, data, onChangeBetAmount, onCreateBet}) => {
    
    let _text = 'Ставка на 0';
    let _color = s.green;
    let _status = s.default;

    _status = (status === 'win') && s.win;
    _status = (status === 'lose') && s.lose;

    if (color === 'red') {
        _text = 'Ставка на 1 к 7';
        _color = s.red;
    }

    if (color === 'black') {
        _text = 'Ставка на 8 к 14';
        _color = s.black;
    }

    let my_bets_classname = (user_total_amount) ? _status : s.default;

    return (
        <div className={[s.main, _color].join(' ')}>
            <div className={s.child}>
                <div className={s.head}>
                    <button onClick={() => onCreateBet(color)}>{_text}</button>
                </div>
                
                <p className={s.container}>
                    Моя ставка
                    <span className={[s.bet, my_bets_classname].join(' ')}>{user_total_amount}</span>
                </p>
            </div>
            
            <div className={s.child}>
                <p className={s.total}>
                    Общие ставки
                    <span className={[s.total_amount, _status].join(' ')}>{total_amount}</span>
                </p>

                {(total_amount === 0) && <p className={s.no_bets}>Ставок нет</p>}

                <div className={s.body}>
                    {
                        data.sort((a, b) => a.amount > b.amount ? -1 : 1).map((b, index) => 
                            <div key={index}>
                                <span>{b.email}</span>
                                <p onClick={() => onChangeBetAmount(b.amount)}>{b.amount}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

BetContainer.propTypes = {
    status: PropTypes.string,
    color: PropTypes.string, 
    user_total_amount: PropTypes.number, 
    total_amount: PropTypes.number,
    data: PropTypes.array, 
    onChangeBetAmount: PropTypes.func, 
    onCreateBet: PropTypes.func
}



export default BetContainer;