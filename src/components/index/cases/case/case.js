import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './case.module.css';

const Case = ({case: {discount_price, price, name, image}, gotoOpenCase}) => {

    let priceJSX = (!discount_price) ? 
        <div className={s.price}>
            <span className={s.price_new}>
                {price} грн
            </span>
        </div> 
        :
        <div className={s.price}>
            <span className={s.price_old}>
                {price} грн
            </span>

            <span className={s.price_new}>
                {discount_price} грн
            </span>
        </div>;

    return (
        <NavLink onClick={gotoOpenCase} className={s.case} to={`/case/${name}`}>
            <div className={s.image}>
                <div className={s.image_container}>
                    <img alt={name} src={require(`../../../../img/cases/${decodeURI(image)}`)}/>
                </div>
            </div>

            <div className={s.name}>
                {name} Case
            </div>

            {priceJSX}
        </NavLink>
    );
}

Case.propTypes = {
    case: PropTypes.object,
    gotoOpenCase: PropTypes.func
}

export default Case;