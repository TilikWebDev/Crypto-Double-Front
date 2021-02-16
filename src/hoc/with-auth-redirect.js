import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {showModal} from '../redux/modal-window-reducer';

let mapStateToPropsForRedirect = (state) => {
    return {
        is_auth: state.auth.is_auth
    };
}

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (props.is_auth) { 
            return <Component {...props}/>
        } else {
            props.showModal('login');
            return <Redirect to={'/'}/>
        }
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect, { showModal })(RedirectComponent);

    return ConnectAuthRedirectComponent;
}