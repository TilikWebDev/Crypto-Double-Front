import React from 'react';
import PropTypes from 'prop-types';

import s from './row.module.css';

const Row = ({last_rolls}) => {
    return (
        last_rolls.map((m, index) => { 
            let color = s.green;
    
            if (m.win_number !== 0) {
                color = (m.win_number > 7) ? s.black : s.red;
            }
    
            return  <tr key={index}>
                        <td>#{m._id}</td>
                        <td>{m.datetime}</td>
                        <td>{m.hash_round}</td>
                        <td>
                            <span className={[s.span, color].join(' ')}>
                                {m.win_number}
                            </span>
                        </td>
                        <td>{m.win_number_section}</td>
                    </tr>
        })
    )
};

Row.propTypes = {
    last_rolls: PropTypes.array
}

export default Row;