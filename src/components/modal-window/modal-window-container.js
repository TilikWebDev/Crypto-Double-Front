import React from 'react';
import { connect } from 'react-redux';

import ModalWindow from './modal-window';
import {showModal, hideModal} from '../../redux/modal-window-reducer';
import {userLogin, userRegister} from '../../redux/auth-reducer';

const ModalWindowContainer = (props) => {
	
	let modal_list = {};
    
    props.modal_window.modal_list.map((m) => {
		return modal_list[m.name] = {...m}
	});

	return (
		<ModalWindow 
			userLogin={props.userLogin}
			userRegister={props.userRegister}
			
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
	userLogin,
	userRegister
})(ModalWindowContainer);