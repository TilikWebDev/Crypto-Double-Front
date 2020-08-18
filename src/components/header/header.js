import React from 'react';
import s from './header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.main}>
			<div className={s.container}>
				<a href="/" className={s.logotype}>cryptodouble</a>
				<div className={s.navbar}>
					<NavLink className={s.link} to={'/'}>Home</NavLink>
					<NavLink className={s.link} to={'/bets'}>Bets</NavLink>
					<NavLink className={s.link} to={'/deposit'}>Deposit</NavLink>
					<NavLink className={s.link} to={'/withdraw'}>Withdraw</NavLink>
					<NavLink className={s.link} to={'/provably-fair'}>Provably Fair</NavLink>
					<NavLink className={s.link} to={'/support'}>Support</NavLink>
				</div>
				<div>
					<div className={s.btngroup}>
						{ 
							(props.is_auth) 
							? 	<div className={s.group}>
									<NavLink className={s.link + ' ' + s.account_link} to={'/account'}>
										{props.email}
									</NavLink>

									<button className={'default_btn ' + s.btn}>
										<i className={'fa fa-volume-down'}></i>
									</button>

									<button className={'default_btn ' + s.btn + ' ' + s.mobile_btn}>
										<i className={'fa fa-bars'}></i>
									</button>

									<button className={'default_btn ' + s.button}>
										<i className={'fa fa-sign-out'}></i>
										Sign out
									</button>
								</div>
							:	<div className={s.group}>
									<button className={'default_btn ' + s.btn}>
										<i className={'fa fa-volume-down'}></i>
									</button>

									<button className={'default_btn ' + s.btn + ' ' + s.mobile_btn}>
										<i className={'fa fa-bars'}></i>
									</button>

									<button onClick={() => props.showModal('login')} className={'default_btn ' + s.button}>
										<i className="fa fa-sign-in"></i>
										Sign in
									</button>
								</div>
						}
					</div>
				</div>
			</div>
		</header>
    )
}

export default Header;