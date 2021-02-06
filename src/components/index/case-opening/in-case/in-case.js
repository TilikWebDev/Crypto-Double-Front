import React from 'react';
import s from './in-case.module.css';

import PropTypes from 'prop-types';

const InCase = ({drops}) => {
    return (
        <div className={s.container}>
            <div className={s.headline}>
                Содержимое кейса
            </div>

            <div className={s.items_columns}>
                {
                    drops.map((d, index) => {

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
                            <div key={index} className={[s.item, rarity].join(' ')}>
                                <div className={s.img}>
                                    <div className={s.img_container}>
                                        <img alt={d.name} src={require(`../../../../img/drop/${decodeURI(d.image)}`)}/>
                                    </div>
                                </div>

                                <div className={s.title}>
                                    {d.name}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

InCase.propTypes = {
    drops: PropTypes.array
}

export default InCase;