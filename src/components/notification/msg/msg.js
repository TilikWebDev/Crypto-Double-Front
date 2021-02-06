import React from 'react';
import PropTypes from 'prop-types';

import s from './msg.module.css';

const Msg = ({status, text, id, removeNotification}) => {

    let style = {};
    let prefix = '';

    if (status === 'error') {
        style = s.error;
        prefix = 'ERROR:';
    }

    if (status === 'success') {
        style = s.success;
        prefix = 'SUCCESS:';
    }

    return (
        <div onClick={() => removeNotification(id)} className={[s.msg, style, s.active].join(' ')}>
            <p>{`${prefix} ${text}`}</p>
        </div>
    );
}

Msg.propTypes = {
    status: PropTypes.string, 
    text: PropTypes.string, 
    id: PropTypes.string, 
    removeNotification: PropTypes.func
}

export default Msg;