import React from 'react';
import s from './left-time.module.css';

const LeftTime = ({time_text, time_line_width}) => {
    return (
        <div className={s.main}>	
            <div className={s.time}>
                { 
                    (isNaN(parseInt(time_text)) ? time_text : `Ролл через: ${time_text}`) 
                }
            </div>

            <div className={s.line} style={{width: `${time_line_width}%`}}></div>
        </div>
    );
}

export default LeftTime;