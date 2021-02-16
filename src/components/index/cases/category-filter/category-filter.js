import React from 'react';
import PropTypes from 'prop-types';

import s from './category-filter.module.css';

const CategoryFilter = ({category_data, changeCaseCategory}) => {
    return (
        <div className={s.container}>
            {
                category_data.map((c, index) => {
                    return <CategoryButton
                        changeCaseCategory={changeCaseCategory}
                        name={c.name}
                        active={c.active}
                        key={index}
                    />
                })
            }
        </div>
    )
};

const CategoryButton = ({name, active, changeCaseCategory}) => {
    let icon_class_name = '';

    switch (name) {
        case 'Все':
            icon_class_name = 'fa-archive';
            break;

        case 'Тренды':
            icon_class_name = 'fa-fire';
            break;

        case 'Скидки':
            icon_class_name = 'fa-percent';
            break;

        case 'Дешевые':
            icon_class_name = 'fa-hand-peace-o';
            break;

        case 'Игры':
            icon_class_name = 'fa-gamepad';
            break;

        case 'Техника':
            icon_class_name = 'fa-desktop';
            break;

        case 'Смарт':
            icon_class_name = 'fa-mobile';
            break;

        case 'Кибер':
            icon_class_name = 'fa-headphones';
            break;

        case 'Девочкам':
            icon_class_name = 'fa-female';
            break;

        case 'Фанатам':
            icon_class_name = 'fa-rocket';
            break;

        case 'Одежда':
            icon_class_name = 'fa-street-view';
            break;

        default: 
            break;
    }

    return (
        <button onClick={() => changeCaseCategory(name)} disabled={active} className={[s.button, (active) && s.active].join(' ')}>
            <i className={['fa', icon_class_name].join(' ')}></i>
            {name}
        </button>
    )
}

CategoryButton.propTypes = {
    name: PropTypes.string,
    active: PropTypes.bool,
    changeCaseCategory: PropTypes.func
}

export default CategoryFilter;