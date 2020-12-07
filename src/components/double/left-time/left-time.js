import React from 'react';
import s from './left-time.module.css';

const LeftTime = (props) => {

    return (
        <div className={s.main}>	
            <div className={s.time}>{ 
                (isNaN(parseInt(props.time_text)) ? 
                    props.time_text : 'Ролл через: ' + props.time_text) 
            }</div>
            <div className={s.line} style={ {width: props.time_line_width + '%'} }></div>
        </div>
    );
}

export default LeftTime;