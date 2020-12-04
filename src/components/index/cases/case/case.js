import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './case.module.css';

const Case = (props) => {

    let price =  <div className={s.price}>
        <span className={s.price_new}>
            {props.case.price} грн
        </span>
    </div>;

    if (props.case.discount_price) {
        price =  <div className={s.price}>
            <span className={s.price_old}>
                {props.case.price} грн
            </span>

            <span className={s.price_new}>
                {props.case.discount_price} грн
            </span>
        </div>;
    }
    

    return (
        <NavLink onClick={props.gotoOpenCase} className={s.case} to={`/case/${props.case.name}`}>
            <div className={s.image}>
                <div className={s.image_container}>
                    <img src={require(`../../../../img/cases/${decodeURI(props.case.image)}`)}/>
                </div>
            </div>

            <div className={s.name}>
                {props.case.name} Case
            </div>

            {price}
        </NavLink>
    );
}

export default Case;