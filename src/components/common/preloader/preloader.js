import React from 'react';
import s from './preloader.module.css';

const Preloader = (props) => {
    return (
        <div className={s.lds}>
            <div className={s.container}><span></span><span></span><span></span><span></span></div>
        </div>
    );
}

export default Preloader;