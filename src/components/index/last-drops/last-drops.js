import React from 'react';
import s from './last-drops.module.css';

const LastDrops = (props) => {
    return (
        <div className={s.last_drop}>
            <div className={s.drop}>
                <div className={s.case}>
                    <img/>
                    {JSON.stringify(props)}
                </div>
                
                <div className={s.case_name}>

                </div>

                <div className={s.case_user}>

                </div>
            </div>
        </div>
    );
}

export default LastDrops;