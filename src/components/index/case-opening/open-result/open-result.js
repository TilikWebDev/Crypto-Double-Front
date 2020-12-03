import React from 'react';
import s from './open-result.module.css';

const OpenResult = (props) => {

    let style = {
        display: (props.opening_status == 'open-result') ? 'flex' : 'none'
    } 
    
    return (
        <div className={s.drop} style={style}>
            <div className={s.image}>
                <img src={require(`../../../../img/drop/${decodeURI(props.win_drop.image)}`)}/>
            </div>

            <div className={s.name}>
                {props.win_drop.name}
            </div>

            <div className={s.footer}>
                <button onClick={() => props.sellDrop(props.win_drop._id, props.win_drop.price)}>Продать за {props.win_drop.price} грн</button>
                <button onClick={props.gotoOpenCase}>Продолжить</button>
            </div>
        </div>
    );
}

export default OpenResult;