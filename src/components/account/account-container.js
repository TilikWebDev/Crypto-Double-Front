import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Account from './account';

const AccountContainer = (props) => {
    return (
        <Account props={props}/>
    )
}

let mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

let withUrlDataContainerComponent = withRouter(AccountContainer);

export default connect(mapStateToProps, {
    
})(withUrlDataContainerComponent);