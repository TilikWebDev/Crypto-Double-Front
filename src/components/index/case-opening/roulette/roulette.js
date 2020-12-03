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
                        return (
                            <div className={s.item + ' ' + s.imm}>
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