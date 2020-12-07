import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket } from "websocket";

import { withRouter } from 'react-router-dom';

import Index from './index';
import {showModal} from '../../redux/modal-window-reducer';
import {createNotification} from '../../redux/notifications-reducer';
import {getCasesData, socketSetNewDrop, gotoOpenCase, getCaseByName, changeAutoSell, openCase, setRollStyle, sellDrop, getLastDropData} from '../../redux/cases-reducer';

const websocket = new w3cwebsocket('ws://' + 'localhost' + ':3013');

const IndexContainer = (props) => {

    useEffect(() => {
        if (!props.cases.length) {
            props.getCasesData();
        }

        if (!props.last_drop.length) {
            props.getLastDropData();
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

            case_name={props.match.params.casename}
            sellDrop={props.sellDrop}
            win_drop={props.win_drop} 
            opening_status={props.opening_status} 
            setRollStyle={props.setRollStyle} 
            roulette_drop={props.roulette_drop} 
            openCase={props.openCase} 
            style_data={props.style_data} 
            auto_sell_drops={props.auto_sell_drops} 
            changeAutoSell={props.changeAutoSell} 
            case_data={props.case_data}
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
        style_data: state.cases.style_data,
        roulette_drop: state.cases.roulette_drop,
        opening_status: state.cases.opening_status,
        win_drop: state.cases.win_drop
	};
}

let withUrlDataContainerComponent = withRouter(IndexContainer);

export default connect(mapStateToProps, {
    showModal,
    getCasesData,
    gotoOpenCase,
    socketSetNewDrop,
    createNotification,

    getCaseByName, 
    changeAutoSell, 
    openCase, 
    setRollStyle, 
    sellDrop,
    getLastDropData
})(withUrlDataContainerComponent);