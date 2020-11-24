import React from 'react';
import s from './last-drops.module.css';

const LastDrops = (props) => {
    return (
        <div className={s.last_drop}>
            <div className={s.best_drop}>
                <div className={s.best_full}>
                    <div className={s.name}>

                    </div>

                    <div className={s.user}>
                        
                    </div>
                </div>

                <div className={s.best_img}>
                    <img/>
                </div>
            </div>

            <div className={s.drop}>
                <img/>

                <div className={s.full}>
                    <div className={s.case}>
                        <img/>
                    </div>
                    
                    <div className={s.case_name}>

                    </div>

                    <div className={s.case_user}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LastDrops;