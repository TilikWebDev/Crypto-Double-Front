import React from 'react';
import s from './footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {

return (
	<footer className={s.main}>
		<div className={s.copyright}>
			Copyright &copy; 2020 <a className={s.link} href="/">cryptodouble.com</a> All rights reserved.
			<div className={s.span}>
				<NavLink className={s.link} to={'/support'}>Support</NavLink> @TilikWebDeveloper  
			</div>
		</div>
	</footer>
	)
};

export default Footer;