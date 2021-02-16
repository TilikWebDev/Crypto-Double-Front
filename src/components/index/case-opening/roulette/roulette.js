import React, { useEffect, createRef, useState } from 'react';
import PropTypes from 'prop-types';

import s from './roulette.module.css';

const Roulette = ({roulette_drop, win_drop_data, changeOpeningStatus}) => {

    const roulette = createRef();
    const [roulette_style, setRouletteStyle] = useState({marginLeft: 0});

    useEffect(() => {
        new Audio(require('../../../../audio/open_case.mp3')).play();

        let winning_position = 0;
        let _drop_list = [...roulette_drop].reverse().splice(20);

        for (let i in _drop_list) {
            if (_drop_list[i]._id === win_drop_data._id) {
                winning_position = 130 - i;
                break;
            }
        }

        setRouletteStyle({
            ...roulette_style,
            marginLeft: (-winning_position * 200) + (roulette.current.offsetWidth / 2) + 100,
            transition: '6s'
        })
        
        setTimeout(() => {
            changeOpeningStatus('open-result');
        }, 6300);


        return (() => {
            new Audio(require('../../../../audio/open_case_end.mp3')).play();
        })
    }, [roulette_drop])

    return (
        <div ref={roulette} className={s.roulette}>
            <div className={s.roulette_container} style={roulette_style}>
                {
                    roulette_drop.map((d, index) => {
                        return (
                            <div key={index} className={[s.item, s[d.class_name]].join(' ')}>
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
    roulette_style_data: PropTypes.object, 
    opening_status: PropTypes.string, 
    setRollStyle: PropTypes.func, 
    roulette_drop: PropTypes.array
}

export default Roulette;