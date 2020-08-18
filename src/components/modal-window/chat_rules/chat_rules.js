import React from 'react';
import s from '../modal-window.module.css';

const ChatRules = (props) => {

    let active = (props.active) ? s.active : '';

    return (
        <div className={s.modal_window_content + ' ' + active}>
            <div className={s.modal_window_header}>
                <span className={s.modal_window_name}> 
                    Chat rules
                </span>

                <i onClick={props.hideModal}  className={'fa fa-times ' + s.modal_close}></i>
            </div>
        
            <div className={s.modal_window_body}>
                <p>1. No Spamming</p>
                <p>2. No Begging for credits</p>
                <p>3. No Posting Promo Codes</p>
                <p>4. No CAPS LOCK</p>
                <p>5. No Promo Codes in Profile Name</p>

                <div className={s.last_btn}>
                    <button  onClick={props.hideModal} className={'default_btn'}>Got it!</button>
                </div>
            </div>
        </div> 
    );
}

export default ChatRules;