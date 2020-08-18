import React from 'react';
import s from './modal-window.module.css';

import Login from './login/login';
import ChatRules from './chat_rules/chat_rules';

const ModalWindow = (props) => {

    let style = {
        display: (props.is_show) ? 'flex' : 'none'
    }

    return (
        <div className={s.modal_window} style={style}>
            <Login 
                password={props.modal_list.login.inputs.password} 
                email={props.modal_list.login.inputs.email} 
                onChangeLoginPassword={props.onChangeLoginPassword} 
                onChangeLoginEmail={props.onChangeLoginEmail} 
                hideModal={props.hideModal} 
                showModal={props.showModal}
                userLogin={props.userLogin}
                active={(props.modal_list.login.active) ? true : false}
            />

            <ChatRules 
                hideModal={props.hideModal}
                active={(props.modal_list.chat_rules.active) ? true : false}
            />
        </div>
    );
}

export default ModalWindow;