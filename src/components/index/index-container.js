import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket } from "websocket";

import { withRouter } from 'react-router-dom';

import Index from './index';
import {showModal} from '../../redux/modal-window-reducer';
import {createNotification} from '../../redux/notifications-reducer';
import {changeCaseCategory, getCategoryData, getCasesData, socketSetNewDrop, gotoOpenCase, getCaseByName, changeAutoSell, openCase, setRollStyle, sellDrop, getLastDropData} from '../../redux/cases-reducer';

const websocket = new w3cwebsocket('ws://' + 'localhost' + ':3013');

const IndexContainer = (props) => {

    useEffect(() => {
        if (!props.cases.length) {
            props.getCasesData();
        }

        if (!props.last_drop.length) {
            props.getLastDropData();
        }

        if (!props.category_data.length) {
            props.getCategoryData();
        }

        (props.match.params.casename) && props.getCaseByName(props.match.params.casename);

        websocket.onopen = () => {
            props.createNotification('Socket connected!', 'success');
        };
    
        websocket.onclose = () => {
            props.createNotification('Socket disconected! Pls reload page!', 'error', false);
        };
    
        websocket.onmessage = (message) => {
            let data = JSON.parse(message.data);
            props.socketSetNewDrop(data);
        };
    }, [props.match.params.casename]);

    return (
        <Index
            cases={props.cases}
            last_drop={props.last_drop}
            gotoOpenCase={props.gotoOpenCase}
            case_data_is_loading={props.case_data_is_loading}
            changeCaseCategory={props.changeCaseCategory}

            case_name={props.match.params.casename}
            sellDrop={props.sellDrop}
            win_drop={props.win_drop} 
            opening_status={props.opening_status} 
            open_button_disabled={props.open_button_disabled}
            setRollStyle={props.setRollStyle} 
            roulette_drop={props.roulette_drop} 
            openCase={props.openCase} 
            style_data={props.style_data} 
            auto_sell_drops={props.auto_sell_drops} 
            sell_drop_button_status={props.sell_drop_button_status}
            changeAutoSell={props.changeAutoSell} 
            case_data={props.case_data}
            category_data={props.category_data}
        />
    );
}

let mapStateToProps = (state) => {
	return {
        //HOC
        ...state.cases,
    
        user_is_auth: state.auth.is_auth,
        case_data: state.cases.case_name_data,
        case_data_is_loading: state.cases.case_data_is_loading,
        auto_sell_drops: state.cases.auto_sell_drops,
        sell_drop_button_status: state.cases.sell_drop_button_status,
        style_data: state.cases.style_data,
        roulette_drop: state.cases.roulette_drop,
        opening_status: state.cases.opening_status,
        win_drop: state.cases.win_drop,
        open_button_disabled: state.cases.open_button_disabled,
        category_data: state.cases.category_data
	};
}

let withUrlDataContainerComponent = withRouter(IndexContainer);

export default connect(mapStateToProps, {
    showModal,
    getCasesData,
    gotoOpenCase,
    socketSetNewDrop,
    createNotification,

    getCategoryData,
    getCaseByName, 
    changeAutoSell, 
    openCase, 
    setRollStyle, 
    sellDrop,
    getLastDropData,
    changeCaseCategory
})(withUrlDataContainerComponent);