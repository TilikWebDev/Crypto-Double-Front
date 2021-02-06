import React from 'react';
import PropTypes from 'prop-types';

import s from '../modal-window.module.css';

const ChatRules = ({active, hideModal}) => {
    return (
        <div className={[s.modal_window_content, (active) && active].join(' ')}>
            <div className={s.modal_window_header}>
                <span className={s.modal_window_name}> 
                    Chat rules
                </span>

                <i onClick={hideModal}  className={['fa fa-times', s.modal_close].join(' ')}></i>
            </div>
        
            <div className={s.modal_window_body}>
                <p>1. No Spamming</p>
                <p>2. No Begging for credits</p>
                <p>3. No Posting Promo Codes</p>
                <p>4. No CAPS LOCK</p>
                <p>5. No Promo Codes in Profile Name</p>

                <div className={s.last_btn}>
                    <button onClick={hideModal} className={'default_btn'}>Got it!</button>
                </div>
            </div>
        </div> 
    );
}

ChatRules.propTypes = {
    active: PropTypes.bool,
    hideModal: PropTypes.func
}

export default ChatRules;