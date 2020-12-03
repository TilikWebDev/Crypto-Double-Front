import React from 'react';
import Cases from './cases/cases';
import LastDrops from './last-drops/last-drops';
import Preloader from '../preloader/preloader';
import CaseOpening from './case-opening/case-opening';

import s from './index.module.css';

const Index = (props) => {
	return 	(
		<div className={s.container}>
			<LastDrops
				last_drop={props.last_drop}
			/>

			{
				(props.case_name) ?
					(props.case_data_is_loading) ?
						<CaseOpening 
							sellDrop={props.sellDrop} 
							gotoOpenCase={props.gotoOpenCase} 
							win_drop={props.win_drop} 
							opening_status={props.opening_status} 
							setRollStyle={props.setRollStyle} 
							roulette_drop={props.roulette_drop} 
							openCase={props.openCase} 
							style_data={props.style_data} 
							auto_sell_drops={props.auto_sell_drops} 
							changeAutoSell={props.changeAutoSell} 
							case_data={props.case_data}/>
						:
						<Preloader/>
				: 
				<Cases
					cases={props.cases}
					gotoOpenCase={props.gotoOpenCase}
				/>
			}
            
			
		</div>
	);
}

export default Index;