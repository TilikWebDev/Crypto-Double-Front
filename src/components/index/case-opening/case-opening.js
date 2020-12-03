import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './case-opening.module.css';
import CaseZoom from './case-zoom/case-zoom';

import InCase from './in-case/in-case';
import OpenResult from './open-result/open-result';
import Roulette from './roulette/roulette';

const CaseOpening = (props) => {

    return (
        <div className={s.container}>
            <Roulette opening_status={props.opening_status} setRollStyle={props.setRollStyle} style_data={props.style_data} roulette_drop={props.roulette_drop}/>
            <CaseZoom opening_status={props.opening_status} openCase={props.openCase} auto_sell_drops={props.auto_sell_drops} price={(props.case_data.discount_price) ? props.case_data.discount_price : props.case_data.price} drop={props.roulette_drop} width={props.style_data.width} name={props.case_data.name} image={props.case_data.image}/>

            {
                (props.win_drop._id) && <OpenResult sellDrop={props.sellDrop} gotoOpenCase={props.gotoOpenCase} opening_status={props.opening_status} win_drop={props.win_drop}/>
            }

            <InCase drops={props.case_data.drops}/>
        </div>
    );
}

export default CaseOpening;