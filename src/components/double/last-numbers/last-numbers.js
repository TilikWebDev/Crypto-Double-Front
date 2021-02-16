import React from 'react';
import s from './last-numbers.module.css';
import { NavLink } from 'react-router-dom';

const LastNumbers = ({last_numbers, now_hash_round}) => {   
    
    return (
        <div className={s.main}>
            {
                last_numbers.map(({color, hash, value}, index) => { 
                    let status = (color !== 'green') ? 
                                    (color === 'black') ? s.black : s.red
                                 : s.green;
            
                    return <span key={index} title={`Хеш раунда: #${hash}`} className={status}>{value}</span> 
                })
            }

            <div className={s.now}>
                След. раунд: 
                <NavLink to={'/provably-fair'}>
                    {
                        (now_hash_round) ? `#${now_hash_round}` : 'Loading'
                    }
                </NavLink>                
            </div>
		</div>
    )
};

export default LastNumbers;