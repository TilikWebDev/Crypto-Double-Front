import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import {getAuthSelector} from '../../redux/auth-selectors';
import * as CasesSelectors from '../../redux/cases-selectors';

import {showModal} from '../../redux/modal-window-reducer';
import {changeCaseCategory, loadCaseByName, openCase, sellDrop, initializeCases, changeOpeningStatus} from '../../redux/cases-reducer';

import Index from './index';

const IndexContainer = (props) => {

    useEffect(() => {
        !props.initialized && props.initializeCases();
    }, [props.initialized]);

    return (
        <Index
            cases_data={props.cases_data}
            case_data_by_name={props.case_data_by_name}
            category_data={props.category_data}

            last_drop_data={props.last_drop_data}
            
            roulette_drop={props.roulette_drop} 
            win_drop_data={props.win_drop_data} 

            sell_drop_button_status={props.sell_drop_button_status}
            opening_status={props.opening_status} 
            open_button_status={props.open_button_status}
            
            changeOpeningStatus={props.changeOpeningStatus}
            loadCaseByName={props.loadCaseByName}
            sellDrop={props.sellDrop}
            openCase={props.openCase} 
            changeCaseCategory={props.changeCaseCategory}
        />
    );
}

let mapStateToProps = (state) => {
	return {
        initialized: CasesSelectors.getCasesInitializedStatus(state),

        user_is_auth: getAuthSelector(state),

        cases_data: CasesSelectors.getCasesDataSelector(state),       
        category_data: CasesSelectors.getCategoryDataSelector(state),
        case_data_by_name: CasesSelectors.getCaseByNameDataSelector(state),

        last_drop_data: CasesSelectors.getLastDropDataSelector(state),

        win_drop_data: CasesSelectors.getWinDropDataSelector(state),
        roulette_drop: CasesSelectors.getRouletteDropSelector(state),

        sell_drop_button_status: CasesSelectors.getSellDropButtonStatusSelector(state),
        opening_status: CasesSelectors.getOpeningStatusSelector(state),
        open_button_status: CasesSelectors.getOpenButtonStatusSelector(state)
	};
}

export default connect(mapStateToProps, {
    showModal,

    initializeCases,
    changeOpeningStatus,
    loadCaseByName, 
    openCase, 
    sellDrop,
    changeCaseCategory
})(IndexContainer);