import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './case-opening.module.css';

import InCase from './in-case/in-case';
import Roulette from './roulette/roulette';

const CaseOpening = (props) => {
    return (
        <div className={s.container}>
            <div className={s.headline}>
                <NavLink className={s.back} to="/">Список Кейсов</NavLink>

                <div className={s.name}>
                    {props.case.name} Case
                </div>
            </div>

            <Roulette drops={props.case.drops}/>

            <button className={s.button}>
                Открыть кейс
            </button>

            <label className={props.auto_sell_drops ? s.label + ' ' + s.active : s.label}>
                <input type="checkbox" onChange={props.changeAutoSell}/>
                Продавать предметы дешевле стоимости кейса
            </label>

            <InCase drops={props.case.drops}/>
            
        </div>
    );
}

export default CaseOpening;