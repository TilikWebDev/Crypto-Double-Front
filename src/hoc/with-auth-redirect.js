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
            if (this.props.is_auth) return <Component {...this.props}/>;
            return <Redirect to={'/modal/login'}/>;
        }
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectAuthRedirectComponent;
}