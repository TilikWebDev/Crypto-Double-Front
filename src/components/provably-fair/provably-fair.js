import React from 'react';
import s from './provably-fair.module.css';

import Row from './row/row';
import Preloader from '../common/preloader/preloader';

import PropTypes from 'prop-types';

const ProvablyFair = ({total_count, page_size, is_fetching, last_rolls, current_page, onChangePage}) => {
    const pages_count = Math.ceil(total_count / page_size);
    const pages = [];

    for (let i = 1; i<= pages_count; i++) {
        pages.push(i);
    }

    return (
        <div className={'container'}>
            <div className={'main_bar'}>
                <div className={s.info}>
                    <div className={s.header}>
                        Provably fair
                    </div>

                    <div className={s.body}>
                        <p>
                            All rolls on cryptodouble.com are generated using a provably fair system. This means the operators cannot manipulate the outcome of any roll.
                            <br/>
                            This code ends the round after a lapse of time and gives a random winning number for the current round.
                        </p>

                        <div className={s.code}>
                            hash_round = db.get().collection('rounds').find().sort(&#123;_id:-1&#125;).limit(1).toArray()[0]._id.toString();
                            win_number = randomInteger(14);
                            win_number_section = randomInteger(100);

                            db.get().collection('rounds').insertOne(&#123;
                                win_number: win_number, 
                                win_number_section: win_number_section, 
                                datetime: Date.now(), 
                                hash_round: hash_round
                            &#125;);

                            function randomInteger(max) &#123;
                                let rand = 0 - 0.5 + Math.random() * (max - 0 + 1);
                                return Math.round(rand);
                            &#125;
                        </div>
                        
                        <p>For more information about provably fair or feel free to <a href={'/contact'}>contact us.</a></p>
                    </div>
                </div>

                { 
                    (is_fetching) ?
                        <Preloader/>
                        :
                        <table className={s.table} cellSpacing={0} cellPadding={0}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Datetime</th>
                                    <th>Hash round</th>
                                    <th>Win number</th>
                                    <th>Win number section</th>
                                </tr>
                            </thead>

                            <tbody>
                                <Row last_rolls={last_rolls} />
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <div className={s.pagintaion}>
                                            {
                                                pages.map(
                                                    (p, index) => <span key={index} onClick={() => onChangePage(p)} className={(current_page === p) ? s.active : null}>{p}</span>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                }
            </div>
        </div>
    );
}

ProvablyFair.propTypes = {
    total_count: PropTypes.number, 
    page_size: PropTypes.number, 
    is_fetching: PropTypes.bool, 
    last_rolls: PropTypes.array, 
    current_page: PropTypes.number, 
    onChangePage: PropTypes.func
}

export default ProvablyFair;