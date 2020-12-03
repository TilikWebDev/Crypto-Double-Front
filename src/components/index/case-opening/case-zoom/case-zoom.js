import React from 'react';
import s from './case-zoom.module.css';

const CaseZoom = (props) => {

    let style = {
        display: (props.opening_status == 'case-zoom') ? 'flex' : 'none'
    } 

    return (
        <div style={style} className={s.container}>
            <div className={s.headline}>
                <div className={s.name}>
                    {props.name} Case
                </div>
            </div>

            <div className={s.image_container}>
                <img className={s.image} src={require(`../../../../img/cases/${decodeURI(props.image)}`)}/>
            </div>

            <button onClick={() => props.openCase(props.name, props.price, props.drop, props.width, props.opening_status)} className={s.button}>
                Открыть {props.price} грн
            </button>

            <label className={props.auto_sell_drops ? s.label + ' ' + s.active : s.label}>
                <input type="checkbox" onChange={props.changeAutoSell}/>
                Продавать предметы дешевле стоимости кейса
            </label>
        </div>
    );
}

export default CaseZoom;