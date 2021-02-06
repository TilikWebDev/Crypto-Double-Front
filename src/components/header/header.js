import React from 'react';
import s from './header.module.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({is_auth = false, email = 'No auth', user_balance = 0, showModal, userLogout}) => {
    return (
        <header className={s.main}>
			<div className={s.container}>
				<NavLink to={'/'} className={s.logotype}>
					<span>App</span><span>Drop</span>.com.ua</NavLink>
				
				<div className={s.btngroup}>
					{ 
						(is_auth) 
						? 	<div className={s.group}>
								<NavLink className={s.btn} to={'/'}>Кейсы</NavLink>
								<NavLink className={s.btn} to={'/double'}>Рулетка</NavLink>

								<NavLink className={[s.btn, s.account_link].join(' ')} to={'/account'}>
									{email}
								</NavLink>

								<button className={s.btn}>
									{user_balance}
									<span className={s.currency}>грн</span>
								</button>

								<button className={s.btn}>
									<i className={'fa fa-volume-down'}></i>
								</button>

								<button className={[s.btn, s.mobile_btn].join(' ')}>
									<i className={'fa fa-bars'}></i>
								</button>

								<button onClick={() => userLogout()} className={[s.btn, s.out].join(' ')}>
									<i className={'fa fa-sign-out'}></i>
								</button>
							</div>
						:	<div className={s.group}>
								<NavLink className={s.btn} to={'/'}>Кейсы</NavLink>
								<NavLink className={s.btn} to={'/double'}>Рулетка</NavLink>

								<button className={s.btn}>
									<i className={'fa fa-volume-down'}></i>
								</button>

								<button className={[s.btn, s.mobile_btn].join(' ')}>
									<i className={'fa fa-bars'}></i>
								</button>

								<button onClick={() => showModal('login')} className={[s.btn, s.in].join(' ')}>
									<i className="fa fa-sign-in"></i>
								</button>
							</div>
					}
				</div>
			</div>
		</header>
    )
}

Header.propTypes = {
	is_auth: PropTypes.bool,
	email: PropTypes.string,
	user_balance: PropTypes.number,
	showModal: PropTypes.func,
	userLogout: PropTypes.func
}

export default Header;