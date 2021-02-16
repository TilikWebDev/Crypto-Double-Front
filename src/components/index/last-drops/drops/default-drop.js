import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../last-drops.module.css';

const DefaultDrop = ({default_drop, style}) => {
    return (
        <div style={style} className={s.container}>
                {
                    default_drop.map((d, index) => {
                        return (
                            <div key={index} className={[s.drop, s[d.class_name]].join(' ')}>
                                <div className={s.image}>
                                    <img alt={d.name} src={require(`../../../../img/drop/${decodeURI(d.image)}`)}/>
                                </div>
                                
                                <div className={s.full}>
                                    <div className={s.full_container}>
                                        <NavLink to={`/case/${d.case_name}`} className={s.case}>
                                            <img alt={d.case_name} src={require(`../../../../img/cases/${decodeURI(d.case_image)}`)}/>
                                        </NavLink>
                                        
                                        <div className={s.drop_name}>
                                            {d.name}
                                        </div>

                                        <div className={s.user}>
                                            {d.user}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
    )
}

export default DefaultDrop;