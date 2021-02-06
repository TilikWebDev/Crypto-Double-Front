import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import s from './roulette.module.css';

const Roulette = ({style_data, opening_status, setRollStyle, roulette_drop}) => {

    let roulette = createRef();

    let style = {
        marginLeft: style_data.marginLeft,
        transition: style_data.transition
    }

    let container_style = {
        height: (opening_status === 'roulette') ? null : 0,
        margin: (opening_status === 'roulette') ? null : 0
    } 

    useEffect(() => {
        setRollStyle({
            width: roulette.current.offsetWidth
        });    
    }, [opening_status]);

    return (
        <div style={container_style} ref={roulette} className={s.roulette}>
            <div className={s.roulette_container} style={style}>
                {
                    roulette_drop.map((d, index) => {
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
                                rarity = s.imm;
                                break;

                            case (price > 1000):
                                rarity = s.leg;
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
                            default: 
                                break;
                        }

                        return (
                            <div key={index} className={s.item + ' ' + rarity}>
                                <div className={s.img}>
                                    <div className={s.img_container}>
                                        <img alt={d.name} src={require(`../../../../img/drop/${decodeURI(d.image)}`)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div className={s.stop}>
            </div>
        </div>
    );
}

Roulette.propTypes = {
    style_data: PropTypes.object, 
    opening_status: PropTypes.bool, 
    setRollStyle: PropTypes.func, 
    roulette_drop: PropTypes.array
}

export default Roulette;