import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './case-zoom.module.css';

const CaseZoom = ({prev_case, color_case, next_case, auto_sell_drops, drop, image, name, openCase, changeAutoSell, open_button_disabled, opening_status, price, width}) => {
    let style = {
        display: (opening_status == 'case-zoom') ? 'flex' : 'none'
    } 

    let btnClass = s.button;

    if (open_button_disabled) btnClass += ' ' + s.disabled;

    return (
        <div style={style} className={s.container}>
            <div className={s.headline}>
                <div className={s.name} style={{background: color_case}}>
                    {name} Case
                </div>
            </div>

            <div className={s.image_container} style={{borderColor: color_case}}>
                <NavLink to={'/case/' + prev_case} className={s.prev_case}>
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                </NavLink>

                <img className={s.image} src={require(`../../../../img/cases/${decodeURI(image)}`)}/>

                <NavLink to={'/case/' + next_case} className={s.next_case}>
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </NavLink>
            </div>

            <button onClick={() => openCase(name, price, drop, width, auto_sell_drops)} className={btnClass}>
                Открыть {price} грн
            </button>

            <label className={auto_sell_drops ? s.label + ' ' + s.active : s.label}>
                <input type="checkbox" onChange={changeAutoSell}/>
                Продавать предметы дешевле стоимости кейса
            </label>
        </div>
    );
}

export default CaseZoom;