import React, { useEffect } from 'react';
import Preloader from '../../common/preloader/preloader';
import s from './case-opening.module.css';
import CaseZoom from './case-zoom/case-zoom';

import InCase from './in-case/in-case';
import OpenResult from './open-result/open-result';
import Roulette from './roulette/roulette';

const CaseOpening = (props) => {

    useEffect(() => {
        props.loadCaseByName(props.route_case_name)
    }, [props.route_case_name])

    return (
        (props.case_data_by_name.case_data_is_loading) ?
            <div className={s.container}>

                {
                    (props.opening_status === 'roulette') && 
                        <Roulette roulette_drop={props.roulette_drop} win_drop_data={props.win_drop_data} changeOpeningStatus={props.changeOpeningStatus}/>
                }
                
                {
                    (props.opening_status === 'case-zoom') && 
                        <CaseZoom color_case={props.case_data_by_name.color} next_case={props.case_data_by_name.next_case} prev_case={props.case_data_by_name.prev_case} open_button_status={props.open_button_status} opening_status={props.opening_status} openCase={props.openCase} price={(props.case_data_by_name.discount_price) ? props.case_data_by_name.discount_price : props.case_data_by_name.price} name={props.case_data_by_name.name} image={props.case_data_by_name.image}/>
                }

                {
                    (props.opening_status === 'open-result') && 
                        <OpenResult next_case={props.case_data_by_name.next_case} prev_case={props.case_data_by_name.prev_case} color_case={props.case_data_by_name.color} sell_drop_button_status={props.sell_drop_button_status} sellDrop={props.sellDrop} changeOpeningStatus={props.changeOpeningStatus} opening_status={props.opening_status} win_drop_data={props.win_drop_data}/>
                }

                <InCase drops={props.case_data_by_name.drops}/>
            </div> 
            : 
            <Preloader/>
    );
};

export default React.memo(CaseOpening);