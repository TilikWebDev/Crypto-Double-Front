import React from 'react';
import s from './provably-fair.module.css';

import Row from './row/row';
import Preloader from '../preloader/preloader';

const ProvablyFair = (props) => {
    let pages_count = Math.ceil(props.total_count / props.page_size);
    let pages = [];

    for (let i = 1; i<= pages_count; i++) {
        pages.push(i);
    }

    return (
        <div className="container">
            <div class="main_bar">
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
                        
                        <p>For more information about provably fair or feel free to <a href="/contact">contact us.</a></p>
                    </div>
                </div>

                { 
                    (props.is_fetching) ?
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
                                <Row last_rolls={props.last_rolls} />
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <div className={s.pagintaion}>
                                            {pages.map((p) => <span key={p} onClick={ () => props.onChangePage(p) } className={(props.current_page === p) ? s.active : undefined}>{p}</span>)}
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

export default ProvablyFair;