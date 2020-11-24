import React, {useEffect} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {withAuthRedirect} from '../../hoc/with-auth-redirect';
import {getCaseByName, changeAutoSell} from '../../redux/cases-reducer';

import CaseOpening from './case-opening';
import Preloader from '../preloader/preloader';

const CaseOpeningContainer = (props) => {

    useEffect(() => {
        props.getCaseByName(props.match.params.casename);
    },[props.match.params.casename])

    if (props.case_data_is_loading) {
        return (
            <CaseOpening auto_sell_drops={props.auto_sell_drops} changeAutoSell={props.changeAutoSell} case={props.case_data}/>
        );
    } else{
        return (
            <Preloader/>
        );
    }

    
}

let mapStateToProps = (state) => {
	return {
        user_is_auth: state.auth.is_auth,
        case_data: state.cases.case_name_data,
        case_data_is_loading: state.cases.case_data_is_loading,
        auto_sell_drops: state.cases.auto_sell_drops
	};
}

export default compose(
    //withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getCaseByName, changeAutoSell})
)(
    CaseOpeningContainer
);