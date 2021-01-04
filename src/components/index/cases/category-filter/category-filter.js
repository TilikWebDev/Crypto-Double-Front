import React from 'react';
import s from './category-filter.module.css';

const CategoryFilter = (props) => {
    return (
        <div className={s.container}>
            {
                props.category_data.map((c, index) => {
                    return <CategoryButton
                        changeCaseCategory={props.changeCaseCategory}
                        name={c.name}
                        active={c.active}
                    />
                })
            }
        </div>
    );
}

const CategoryButton = (props) => {
    let icon_class_name = '';

    switch (props.name) {
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

        case 'Смартфоны':
            icon_class_name = 'fa-mobile';
            break;

        case 'Киберспорт':
            icon_class_name = 'fa-headphones';
            break;

        case 'Для девочек':
            icon_class_name = 'fa-female';
            break;

        case 'Для фанатов':
            icon_class_name = 'fa-rocket';
            break;

        case 'Одежда':
            icon_class_name = 'fa-street-view';
            break;
    }

    let active = (props.active) ? s.active : null;

    return (
        <button onClick={() => props.changeCaseCategory(props.name)} className={s.button + ' ' + active}>
            <i className={'fa ' + icon_class_name}></i>
            {props.name}
        </button>
    )
}

export default CategoryFilter;