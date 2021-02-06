import React from 'react';
import s from './footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {

return (
	<footer className={s.main}>
		<div className={s.copyright}>
			Copyright &copy; {new Date().getFullYear()} 
			<NavLink className={s.link} to={'/'}>cryptodouble.com</NavLink> All rights reserved.
			
			<div className={s.span}>
				<NavLink className={s.link} to={'/support'}>Support</NavLink> 

				<a className={s.link_tg} target={'_blank'} href={'https://t.me/tilikwebdeveloper'}>
					@TilikWebDeveloper  
				</a>
			</div>
		</div>
	</footer>
	)
};

export default Footer;