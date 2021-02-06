import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => {
    return {
        is_auth: state.auth.is_auth
    };
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            return (this.props.is_auth) ? 
                <Component {...this.props}/> :
                <Redirect to={'/modal/login'}/>;
        }
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectAuthRedirectComponent;
}