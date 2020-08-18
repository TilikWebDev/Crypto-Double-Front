import React from 'react';
import s from './footer.module.css';

const Footer = () => {

return (
	<footer className={s.main}>
		<div className={s.copyright}>
			Copyright &copy; 2020 <a className={s.link} href="/">cryptodouble.com</a> All rights reserved.
			<div className={s.span}>
			  <a className={s.link} href="/api_sports_betting">API</a> @TilikWebDeveloper  
			</div>
		</div>
	</footer>
	)
};

export default Footer;