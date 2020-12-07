import React from 'react';
import s from './last-numbers.module.css';
import { NavLink } from 'react-router-dom';

const LastNumbers = (props) => {

    let numbers = props.last_numbers.map((m, index) => { 
        let color;

        if (m.color === 'red') color = s.red;
        if (m.color === 'black') color = s.black;

        return <span key={index} title={"Хеш раунда: #" + m.hash} className={ color }>{ m.value }</span> 
    });
    
    
    return (
        <div className={s.main}>

            {numbers}

            <div className={s.now}>
                След. раунд: 
                { (props.now_hash_round) ? <NavLink to="/provably-fair">#{props.now_hash_round}</NavLink> : ' Загрузка...' }                
            </div>
		</div>
    )
};

export default LastNumbers;