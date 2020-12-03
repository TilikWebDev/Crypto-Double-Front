import React from 'react';
import s from './header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.main}>
			<div className={s.container}>
				<NavLink to={'/'} className={s.logotype}>
					<span>App</span><span>Drop</span>.com.ua</NavLink>
				
				<div className={s.btngroup}>
					{ 
						(props.is_auth) 
						? 	<div className={s.group}>
								<NavLink className={s.btn} to={'/double'}>Double</NavLink>

								<NavLink className={s.btn + ' ' + s.account_link} to={'/account'}>
									{props.email}
								</NavLink>

								<button className={s.btn}>
									{props.user_balance}
									<span className={s.currency}>грн</span>
								</button>

								<button className={s.btn}>
									<i className={'fa fa-volume-down'}></i>
								</button>

								<button className={s.btn + ' ' + s.mobile_btn}>
									<i className={'fa fa-bars'}></i>
								</button>

								<button className={s.btn + ' ' + s.out}>
									<i className={'fa fa-sign-out'}></i>
								</button>
							</div>
						:	<div className={s.group}>
								<NavLink className={s.btn} to={'/double'}>Double</NavLink>
								<NavLink className={s.btn} to={'/support'}>Support</NavLink>

								<button className={s.btn}>
									<i className={'fa fa-volume-down'}></i>
								</button>

								<button className={s.btn + ' ' + s.mobile_btn}>
									<i className={'fa fa-bars'}></i>
								</button>

								<button onClick={() => props.showModal('login')} className={s.btn + ' ' + s.in}>
									<i className="fa fa-sign-in"></i>
								</button>
							</div>
					}
				</div>
			</div>
		</header>
    )
}

export default Header;