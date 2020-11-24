import React from 'react';
import s from './roulette.module.css';

const roll = React.createRef();

const Roulette = (props) => {


    let style = {
        backgroundImage: 'url(' + props.roulette_styles.backgroundImage + ')',
        transition: props.roulette_styles.transition,
        backgroundPositionX: props.roulette_styles.backgroundPositionX
    }

    let setSizesRoulette = () => {
        props.rouletteResize(roll.current.offsetWidth, roll.current.offsetHeight);
    }

    return (
        <div className={ s.main }>
            <div className={ s.route } style={ style } ref={ roll }>
            </div>

            <img onLoad={ setSizesRoulette } src={ props.roulette_styles.backgroundImage } alt=""/>

            <div className={ s.stop }>
                
            </div>
        </div>
    )
};

export default Roulette;