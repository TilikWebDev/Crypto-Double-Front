import React, {createRef} from 'react';
import s from './roulette.module.css';

const Roulette = ({roulette_styles, rouletteResize}) => {

    const roll = createRef();
    
    let style = {
        backgroundImage: `url(${roulette_styles.backgroundImage})`,
        transition: roulette_styles.transition,
        backgroundPositionX: roulette_styles.backgroundPositionX || 0
    }

    return (
        <div className={s.main}>
            <div className={s.route} style={style} ref={roll}>
            </div>

            <img onLoad={() => rouletteResize(roll.current.offsetWidth, roll.current.offsetHeight)} src={roulette_styles.backgroundImage} alt={'Roulette'}/>

            <div className={s.stop}>
            </div>
        </div>
    )
};

export default Roulette;