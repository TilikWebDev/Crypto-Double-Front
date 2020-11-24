import React from 'react';
import s from './cases.module.css';
import Case from './case/case';
import Category from './category/category';

const Cases = (props) => {

    let category = -1;

    return (
        <div className={s.cases_container}>
            {
                props.cases.map((p, index) => {
                    if (category !== p.category_id) {
                        category = p.category_id;

                        return [<Category 
                                    key={index}
                                    name={p.category}
                                />,
                                <Case 
                                    key={index + 1} 
                                    case={p} 
                                />
                                ];
                    }

                    return <Case 
                                key={index} 
                                case={p} 
                            />;
                })
            }
        </div>
    );
}

export default Cases;