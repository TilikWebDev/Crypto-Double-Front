import React from 'react';
import s from './modal-window.module.css';

import Login from './login/login';
import Register from './register/register';
import ChatRules from './chat_rules/chat_rules';

const ModalWindow = (props) => {

    let style = {
        display: (props.is_show) ? 'flex' : 'none'
    }

    return (
        <div className={s.modal_window} style={style}>
            <Login 
                hideModal={props.hideModal} 
                showModal={props.showModal}
                userLogin={props.userLogin}
                active={(props.modal_list.login.active) ? true : false}
            />

            <Register
                hideModal={props.hideModal} 
                showModal={props.showModal}
                userRegister={props.userRegister}
                active={(props.modal_list.register.active) ? true : false}
            />

            <ChatRules 
                hideModal={props.hideModal}
                active={(props.modal_list.chat_rules.active) ? true : false}
            />
        </div>
    );
}

export default ModalWindow;