import React, {useEffect} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';

import {withAuthRedirect} from '../../hoc/with-auth-redirect';
import Bets from './bets';
import {getBetsList} from '../../redux/bets-reducer';

const BetsContainer = (props) => {

    let location = useLocation()

    useEffect(() => {
        let status = (props.match.params.status) ? props.match.params.status : 'upcoming';
        props.getBetsList(status);
    },[location])

    return (
        <Bets bets_list={props.bets_list}/>
    );
}

let mapStateToProps = (state) => {
	return {
        bets_list: state.bets.bets_list
	};
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getBetsList})
)(
    BetsContainer
);