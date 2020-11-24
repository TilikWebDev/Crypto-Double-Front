import React from 'react';
import s from './category.module.css';

const Category = (props) => {
    return (
        <div className={s.border}>
            <div className={s.headline}>
                {props.name}
            </div>
        </div>
    );
};

export default Category;