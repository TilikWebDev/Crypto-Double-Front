import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './case-zoom.module.css';

const CaseZoom = ({loadCaseByName, prev_case, color_case, next_case, image, name, openCase, open_button_status, opening_status, price}) => {

    let [auto_sell_drop_status, changeSellDropStatus] = useState(false);

    return (
        <div style={{display: (opening_status === 'case-zoom') ? 'flex' : 'none'}} className={s.container}>
            <div className={s.headline}>
                <div className={s.name} style={{background: color_case}}>
                    {name} Case
                </div>
            </div>

            <div className={s.image_container} style={{borderColor: color_case}}>
                <NavLink to={'/case/' + prev_case} onClick={() => {loadCaseByName(prev_case)}} className={s.prev_case}>
                    <i className={'fa fa-angle-double-left'} aria-hidden={'true'}></i>
                </NavLink>

                <img alt={name} className={s.image} src={require(`../../../../img/cases/${decodeURI(image)}`)}/>

                <NavLink to={'/case/' + next_case} className={s.next_case}>
                    <i className={'fa fa-angle-double-right'} aria-hidden={'true'}></i>
                </NavLink>
            </div>

            <button onClick={() => openCase(name, price, auto_sell_drop_status)} className={[s.button, open_button_status && s.disabled].join(' ')}>
                Открыть {price} грн
            </button>

            <label className={auto_sell_drop_status ? s.label + ' ' + s.active : s.label}>
                <input type={'checkbox'} onChange={() => changeSellDropStatus(!auto_sell_drop_status)}/>
                Продавать предметы дешевле стоимости кейса
            </label>
        </div>
    );
}

export default CaseZoom;