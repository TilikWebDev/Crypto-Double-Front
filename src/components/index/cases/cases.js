import React from 'react';
import s from './cases.module.css';
import Case from './case/case';

import CategoryFilter from './category-filter/category-filter';

const Cases = (props) => {

    var active_category_data = 0;

    props.category_data.map((d, index) => {
        if (d.active) {
            active_category_data = index;
            return;
        }
    });

    return (
        <div className={s.cases_container}>

            <CategoryFilter changeCaseCategory={props.changeCaseCategory} category_data={props.category_data}/>

            <div className={s.cases_list}>
                {
                    props.cases.map((p, index) => {

                        return (props.category_data[active_category_data].cases.includes(p.name)) ? 
                            <Case 
                                key={index} 
                                case={p} 
                            /> 
                            
                            : 
                            
                            false;
                    })
                }
            </div>
        </div>
    );
}

export default Cases;