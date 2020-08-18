import React from 'react';
import Msg from './msg/msg';
import s from './notification.module.css';

const Notification = (props) => {

    let notificationObject = props.notifications.map((m, index) => { 

        return  <Msg 
                    key={index} 
                    id={m.id} 
                    text={m.text} 
                    status={ m.status }
                    createNotification={ props.createNotification}
                    removeNotification={ props.removeNotification }
                /> 
    });

    return (
        <div className={s.msga} id={ 'msga' }>
            { notificationObject }
        </div>
    );
}

export default  Notification;