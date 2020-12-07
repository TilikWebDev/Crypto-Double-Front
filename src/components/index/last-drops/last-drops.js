import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './last-drops.module.css';

const LastDrops = (props) => {

    if (props.last_drop.best_drop.name) { 
        var best_rarity = s.b_com;
        var best_price = parseInt(props.last_drop.best_drop.price);

        switch (true) {
            case (best_price > 50000):
                best_rarity = s.b_anc;
                break;

            case (best_price > 20000):
                best_rarity = s.b_arc;
                break;

            case (best_price > 10000):
                best_rarity = s.b_leg;
                break;

            case (best_price > 1000):
                best_rarity = s.b_imm;
                break;

            case (best_price > 500):
                best_rarity = s.b_myt;
                break;

            case (best_price > 250):
                best_rarity = s.b_rar;
                break;

            case (best_price > 100):
                best_rarity = s.b_unc;
                break;
        }
    }

    return (
        <div className={s.last_drop}>
            {props.last_drop.best_drop.name &&                
                <div className={s.best_drop + ' ' + best_rarity}>
                    <div className={s.image}>
                        <img src={require(`../../../img/drop/${decodeURI(props.last_drop.best_drop.image)}`)}/>
                    </div>

                    <div className={s.best_drop_text}>
                        <div className={s.best_drop_title}>Шикарный дроп!</div>

                        <div className={s.best_drop_price}>
                            {props.last_drop.best_drop.price} 
                            <span className={s.currency}>грн.</span>
                        </div>
                    </div>

                    <div className={s.full}>
                        <div className={s.full_container}>
                            <NavLink to={'/case/' + props.last_drop.best_drop.case_name} className={s.case}>
                                <img src={require(`../../../img/cases/${decodeURI(props.last_drop.best_drop.case_image)}`)}/>
                            </NavLink>
                            
                            <div className={s.drop_name}>
                                {props.last_drop.best_drop.name}
                            </div>

                            <div className={s.user}>
                                {props.last_drop.best_drop.user}
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            <div style={props.last_drop.best_drop.name && {left: 320}} className={s.container}>
                {
                    props.last_drop.default.map((d) => {

                        let rarity = s.com;
                        let price = parseInt(d.price);

                        switch (true) {
                            case (price > 50000):
                                rarity = s.anc;
                                break;

                            case (price > 20000):
                                rarity = s.arc;
                                break;

                            case (price > 10000):
                                rarity = s.leg;
                                break;
                            
                            case (price > 1000):
                                rarity = s.imm;
                                break;

                            case (price > 500):
                                rarity = s.myt;
                                break;

                            case (price > 250):
                                rarity = s.rar;
                                break;

                            case (price > 100):
                                rarity = s.unc;
                                break;
                        }

                        return (
                            <div className={s.drop + ' ' + rarity}>
                                <div className={s.image}>
                                    <img src={require(`../../../img/drop/${decodeURI(d.image)}`)}/>
                                </div>
                                
                                <div className={s.full}>
                                    <div className={s.full_container}>
                                        <NavLink to={'/case/' + d.case_name} className={s.case}>
                                            <img src={require(`../../../img/cases/${decodeURI(d.case_image)}`)}/>
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
        </div>
    );
}

export default LastDrops;