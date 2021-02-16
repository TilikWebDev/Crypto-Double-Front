import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './last-drops.module.css';
import BestDrop from './drops/best-drop';
import DefaultDrop from './drops/default-drop';

const LastDrops = ({best_drop, default_drop}) => {
    return (
        <div className={s.last_drop}>
            { 
                best_drop.name && <BestDrop best_drop={best_drop}/> 
            }

            <DefaultDrop style={best_drop.name && {left: 320}} default_drop={default_drop}/>
        </div>
    );
}

LastDrops.propTypes = {
    last_drop_data: PropTypes.object
}

export default LastDrops;