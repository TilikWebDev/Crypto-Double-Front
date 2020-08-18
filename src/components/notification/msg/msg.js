import React from 'react';
import s from './msg.module.css';

const Msg = (props) => {

    let style = {};
    let prefix = '';
    let message = React.createRef();

    if (props.status === 'error') {
        style = s.error;
        prefix = 'ERROR: ';
    }

    if (props.status === 'success') {
        style = s.success;
        prefix = 'SUCCESS: ';
    }

    return (
        <div onClick={ () => props.removeNotification(props.id) } ref={message} className={ s.msg + ' ' + style + ' ' + s.active}>
            <p>{ prefix + props.text}</p>
        </div>
    );
}

export default Msg;