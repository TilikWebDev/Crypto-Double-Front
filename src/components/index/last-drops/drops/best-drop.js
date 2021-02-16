import React from 'react';
import { NavLink } from 'react-router-dom';

import s from '../last-drops.module.css';

const BestDrop = ({best_drop}) => {
    return (
        <div className={[s.best_drop, best_drop.class_name].join(' ')}>
            <div className={s.image}>
                <img alt={best_drop.name} src={require(`../../../../img/drop/${decodeURI(best_drop.image)}`)}/>
            </div>

            <div className={s.best_drop_text}>
                <div className={s.best_drop_title}>Шикарный дроп!</div>

                <div className={s.best_drop_price}>
                    {best_drop.price} 
                    <span className={s.currency}>грн.</span>
                </div>
            </div>

            <div className={s.full}>
                <div className={s.full_container}>
                    <NavLink to={`/case/${best_drop.case_name}`} className={s.case}>
                        <img alt={best_drop.case_name} src={require(`../../../../img/cases/${decodeURI(best_drop.case_image)}`)}/>
                    </NavLink>
                    
                    <div className={s.drop_name}>
                        {best_drop.name}
                    </div>

                    <div className={s.user}>
                        {best_drop.user}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BestDrop, (prevProps, nextProps) => {
    return (prevProps.best_drop.name === nextProps.best_drop.name)
});