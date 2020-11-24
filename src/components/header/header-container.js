import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import {getUserData} from '../../redux/auth-reducer';
import {showModal} from '../../redux/modal-window-reducer';

class HeaderContainer extends React.Component {

    componentDidMount(){
        this.props.getUserData();
    }

    render(){
        return (
            <Header 
                email={this.props.email}
                balance={this.props.balance}
                color={this.props.color}
                is_auth={this.props.is_auth}
                user_balance={this.props.user_balance}

                showModal={this.props.showModal}
            />
        )
    }
}

let mapStateToProps = (state) => {
	return {
        ...state.auth,
        user_balance: state.user.user_balance
	};
}

export default connect(mapStateToProps, {
    showModal,
    getUserData
})(HeaderContainer);