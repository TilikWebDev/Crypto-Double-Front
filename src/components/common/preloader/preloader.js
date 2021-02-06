import React from 'react';
import s from './preloader.module.css';

const Preloader = (props) => {
    return (
        <div className={s.lds}><div></div><div></div><div></div><div></div></div>
    );
}

export default Preloader;