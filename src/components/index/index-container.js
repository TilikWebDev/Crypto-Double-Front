import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket } from "websocket";

import { withRouter } from 'react-router-dom';

import Index from './index';
import {showModal} from '../../redux/modal-window-reducer';
import {getCasesData, getLastDropData, updateLastDropData} from '../../redux/cases-reducer';

//const websocket = new w3cwebsocket('ws://' + 'localhost' + ':3013');

class IndexContainer extends React.Component {
    componentDidMount(){
        this.props.getCasesData();
        this.props.getLastDropData();
    }

    render () {
        return (
            <Index
                cases={this.props.cases}
                last_drop={this.props.last_drop}
            />
        );
    }
}

let mapStateToProps = (state) => {
	return {
        //HOC
        ...state.cases,
        user_is_auth: state.auth.is_auth
	};
}

let withUrlDataContainerComponent = withRouter(IndexContainer);

export default connect(mapStateToProps, {
    showModal,
    getCasesData,
    getLastDropData,
    updateLastDropData
})(withUrlDataContainerComponent);