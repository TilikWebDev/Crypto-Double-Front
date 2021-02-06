import React from 'react';
import PropTypes from 'prop-types';

import s from './cases.module.css';
import Case from './case/case';
import CategoryFilter from './category-filter/category-filter';

const Cases = ({category_data, changeCaseCategory, cases}) => {

    let active_category_data = 0;

    category_data.map((d, index) => {
        return (d.active) ? active_category_data = index : true;
    });

    return (
        <div className={s.cases_container}>

            <CategoryFilter changeCaseCategory={changeCaseCategory} category_data={category_data}/>

            <div className={s.cases_list}>
                {
                    cases.map((p, index) => {

                        return (category_data[active_category_data].cases.includes(p.name)) ? 
                            <Case 
                                key={index} 
                                case={p} 
                            /> 
                            : 
                            true;
                    })
                }
            </div>
        </div>
    );
}

Cases.propTypes = {
    category_data: PropTypes.array, 
    changeCaseCategory: PropTypes.func, 
    cases: PropTypes.array
}

export default Cases;