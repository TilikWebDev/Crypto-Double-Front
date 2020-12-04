import React from 'react';
import s from './last-drops.module.css';

const LastDrops = (props) => {

    return (
        <div className={s.last_drop}>
            {
                props.last_drop.default.map((d) => {
                    return (
                        <div className={s.drop}>
                            <div className={s.image}>
                                <img src={require(`../../../img/drop/${decodeURI(d.image)}`)}/>
                            </div>
                            
                            <div className={s.full}>
                                <div className={s.drop_name}>
                                    {d.name}
                                </div>

                                <div className={s.user}>
                                    {d.user}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LastDrops;