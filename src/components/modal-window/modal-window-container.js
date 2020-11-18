import React from 'react';
import { connect } from 'react-redux';

import ModalWindow from './modal-window';
import {showModal, hideModal, onChangeLoginEmail, onChangeLoginPassword, userLogin, onChangeRegisterEmail, onChangeRegisterPassword, onChangeRegisterPassword2, userRegister} from '../../redux/modal-window-reducer';

const ModalWindowContainer = (props) => {
	
	let modal_list = {};
    
    props.modal_window.modal_list.map((m) => {
        modal_list[m.name] = {...m}
	});

	const userLogin = () => {
		props.userLogin(modal_list.login.inputs.email, modal_list.login.inputs.password);
	}

	const userRegister = () => {
		props.userRegister(modal_list.register.inputs.email, modal_list.register.inputs.password, modal_list.register.inputs.password2);
	}

	return (
		<ModalWindow 
			onChangeLoginEmail={props.onChangeLoginEmail} 
			onChangeLoginPassword={props.onChangeLoginPassword} 
			userLogin={userLogin}

			onChangeRegisterEmail={props.onChangeRegisterEmail}
			onChangeRegisterPassword={props.onChangeRegisterPassword}
			onChangeRegisterPassword2={props.onChangeRegisterPassword2}
			userRegister={userRegister}
			
			is_show={props.modal_window.is_show} 
			modal_list={modal_list} 
			showModal={props.showModal} 
			hideModal={props.hideModal}
		/>
	);
}

let mapStateToProps = (state) => {
	return {
		modal_window: state.modal_window
	};
}

export default connect(mapStateToProps, {
    showModal,
    hideModal,
    onChangeLoginEmail,
    onChangeLoginPassword,
	userLogin,
	onChangeRegisterEmail,
	onChangeRegisterPassword,
	onChangeRegisterPassword2,
	userRegister
})(ModalWindowContainer);