import React from 'react';
import s from './bet-form.module.css';

const BetForm = (props) => {
    let betAmount = React.createRef();

    const onChangeBetAmount = () => {
		props.onChangeBetAmount(betAmount.current.value);
    }

    return (
        <div className={s.main}>
            <p className={s.balance}>Balance: 
                <span className={s.my_balance}>
                    { props.user_balance }

                    <span className={s.currency}>UAH</span>
                </span>
            </p>

            <div className={s.form}>
                <button className={'default_btn danger'} onClick={ () => props.calcBetAmount('clear') }>Clear</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('+1') }>+1</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('+10') }>+10</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('+100') }>+100</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('+1000') }>+1000</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('1/2') }>1/2</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('x2') }>x2</button>
                <button className={'default_btn'} onClick={ () => props.calcBetAmount('max') }>Max</button>

                <button onClick={ props.getBalance } className={'default_btn success'}>
                    Refresh balance
                </button>
            </div>
            
            <div className={"input_type_relative " + s.input_type_relative}>
                <input onChange={ onChangeBetAmount } value={props.user_bet_amount} placeholder="Bet amount..." type="email" ref={ betAmount }/>

                <div className={s.bet_buttons}>
                    <button onClick={ () => props.onCreateBet('red') }></button>
                    <button onClick={ () => props.onCreateBet('green') }></button>
                    <button onClick={ () => props.onCreateBet('black') }></button>
                </div>
            </div>
        </div>
    );
}

export default BetForm;