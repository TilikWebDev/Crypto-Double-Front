import React from 'react';
import s from './in-case.module.css';

const InCase = (props) => {
    return (
        <div className={s.container}>
            <div className={s.headline}>
                Содержимое кейса
            </div>

            <div className={s.items_columns}>
                {
                    props.drops.map((d) => {

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
                        }

                        return (
                            <div className={s.item + ' ' + rarity}>
                                <div className={s.img}>
                                    <div className={s.img_container}>
                                        <img src={require(`../../../../img/drop/${decodeURI(d.image)}`)}/>
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

export default InCase;