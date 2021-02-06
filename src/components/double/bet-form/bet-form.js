import React from 'react';
import s from './bet-form.module.css';

import PropTypes  from 'prop-types';

const BetForm = ({user_balance, user_bet_amount, onChangeBetAmount, calcBetAmount, getBalance}) => {
    let buttons = ['clear', '+1', '+10', '+100', '+1000', '1/2', 'x2', 'max'];

    const onChange = (e) => {
        onChangeBetAmount(e.currentTarget.value);
    }

    return (
        <div className={s.main}>
            <p className={s.balance}>Баланс: 
                <span className={s.my_balance}>
                    {user_balance}
                    <span className={s.currency}>грн</span>
                </span>
            </p>

            <div className={s.form}>
                {
                    buttons.map((b, index) => 
                        <button key={index} className={['default_btn', (index === 0) && 'danger'].join(' ')} onClick={() => calcBetAmount(b)}>{b.toUpperCase()}</button>
                    )
                }
                <button onClick={getBalance} className={'default_btn success'}>
                    Обнов. баланс
                </button>
            </div>
            
            <div className={['input_type_relative', s.input_type_relative].join(' ')}>
                <input onChange={onChange} value={user_bet_amount} placeholder={'Ставка...'}/>
            </div>
        </div>
    );
}

BetForm.propTypes = {
    user_balance: PropTypes.number, 
    user_bet_amount: PropTypes.number, 
    onChangeBetAmount: PropTypes.func, 
    calcBetAmount: PropTypes.func, 
    getBalance: PropTypes.func
}

export default BetForm;