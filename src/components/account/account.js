import React from 'react';
import s from './account.module.css';

const Account = (props) => {
    return (
        <div className={s.main}>
            <div className={s.name}>
                Account Name:
                admin@admin.com
            </div>

            <div className={s.balance}>
                Account balance:
                32321 грн
            </div>
        </div>
    )
}

export default Account;