import React from 'react';
import s from './roulette.module.css';

const Roulette = (props) => {

    let drops = props.drops;

    return (
        <div className={s.roulette}>
            <div className={s.stop}>
            </div>

            <div className={s.roulette_container}>
                {
                    drops.map((d) => {
                        return (
                            <div className={s.item + ' ' + s.imm}>
                                <div className={s.img}>
                                    <div className={s.img_container}>
                                        <img src={require(`../../../img/drop/${decodeURI(d.image)}`)}/>
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

export default Roulette;