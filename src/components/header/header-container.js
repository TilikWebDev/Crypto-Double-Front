import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './header';
import {userLogout} from '../../redux/auth-reducer';
import {showModal} from '../../redux/modal-window-reducer';

const HeaderContainer = ({email, balance, color, is_auth, user_balance, showModal, userLogout}) => {
    return (
        <Header 
            email={email}
            balance={balance}
            color={color}
            is_auth={is_auth}
            user_balance={user_balance}
            showModal={showModal}
            userLogout={userLogout}
        />
    )
}

HeaderContainer.propTypes = {
    email: PropTypes.string, 
    balance: PropTypes.number, 
    color: PropTypes.string, 
    is_auth: PropTypes.bool, 
    user_balance: PropTypes.number, 
    showModal: PropTypes.func,
    getUserData: PropTypes.func,
    userLogout: PropTypes.func
};

let mapStateToProps = (state) => {
	return {
        is_auth: state.auth.is_auth,
        ...state.user
	};
}

export default connect(mapStateToProps, {
    showModal,
    userLogout
})(HeaderContainer);