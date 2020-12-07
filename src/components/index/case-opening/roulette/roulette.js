import React, { useEffect } from 'react';
import s from './roulette.module.css';

const Roulette = (props) => {

    let roulette = React.createRef();

    React.useEffect(() => {
        props.setRollStyle({
            width: roulette.current.offsetWidth
        });    
    }, [props.opening_status]);

    let style = {
        marginLeft: props.style_data.marginLeft,
        transition: props.style_data.transition
    };

    let container_style = {
        height: (props.opening_status == 'roulette') ? null : 0,
        margin: (props.opening_status == 'roulette') ? null : 0
    } 

    return (
        <div style={container_style} ref={roulette} className={s.roulette}>
            <div className={s.roulette_container} style={style}>
                {
                    props.roulette_drop.map((d) => {
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
                            <div className={s.item + ' ' + rarity}>
                                <div className={s.img}>
                                    <div className={s.img_container}>
                                        <img src={require(`../../../../img/drop/${decodeURI(d.image)}`)}/>
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

export default Roulette;