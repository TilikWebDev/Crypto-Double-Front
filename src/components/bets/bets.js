import React from 'react';
import {NavLink} from 'react-router-dom';

import s from './bets.module.css';
import Match from './match/match';

const Bets = (props) => {

    let matches = props.bets_list.map((b, index) => {
        return <Match key={index} {...b} />
    })

    return (
		<div className={"row container"}>
			<div className={s.left_bar}>
				<div className={s.my_bets_statistic}>
					<h1>My bets statistic</h1>

					<div className="row">
						Active: <span>0</span>
					</div>

					<div className="row high">
						Win: <span>0</span>
					</div>

					<div className="row low">
						Lose: <span>0</span>
					</div>
				</div>
				
				<div className={s.game_collections}>
					<a className={s.active} href="/bets">
						<div className={s.img}>
							<img src="/img/game_icons/csgo.jpg" alt=""/>
						</div>
						CS:GO
					</a>

					<a className="disabled" href="/bets?game=dota2">
						<div className={s.img}>
							<img src="/img/game_icons/dota.jpg" alt=""/>
						</div>
						Dota 2
					</a>
					
					<a className="disabled" href="/bets?game=pubg">
						<div className={s.img}>
							<img src="/img/game_icons/pubg.jpg" alt=""/>
						</div>
						Pubg
					</a>
				</div>
			</div>

			<div className={s.game_bar}>
				<div className={s.bets_block}>
					<div className={s.nav_list}>
						<NavLink exact to="/bets/" activeClassName={s.active}>
							Upcomming
						</NavLink>

						<NavLink to="/bets/live" activeClassName={s.active}>
							Live
						</NavLink>

						<NavLink to="/bets/ended" activeClassName={s.active}>
							Results
						</NavLink>
					</div>

					<div className={s.nav_body}>

                        {matches}

					</div>
				</div>
			</div>
		</div>
	);
}

export default Bets;