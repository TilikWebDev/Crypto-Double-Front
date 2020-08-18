import React from 'react';
import s from './row.module.css';

const Row = (props) => {

    let rowObject = props.last_rolls.map((m, index) => { 

        let color = s.green;

        if (m.win_number !== 0) {
            color = (m.win_number > 7) ? s.black : s.red;
        }

        return  <tr key={index}>
                    <td>#{m._id}</td>
                    <td>{m.datetime}</td>
                    <td>{m.hash_round}</td>
                    <td>
                        <span className={s.span + ' ' + color}>
                            {m.win_number}
                        </span>
                    </td>
                    <td>{m.win_number_section}</td>
                </tr>
    });
    return (
        rowObject
    )
};

export default Row;