import React from 'react';
import Cases from './cases/cases';
import LastDrops from './last-drops/last-drops';
import Preloader from '../common/preloader/preloader';
import CaseOpening from './case-opening/case-opening';

import s from './index.module.css';
import { useParams } from 'react-router-dom';

const Index = (props) => {
	
	const route_case_name = useParams().route_case_name;
	
	return 	(
		<div className={s.container}>
			<LastDrops
				best_drop={props.last_drop_data.best_drop}
				default_drop={props.last_drop_data.default_drop}
			/>
			{
				(route_case_name) ?
					<CaseOpening 
						changeOpeningStatus={props.changeOpeningStatus}
						route_case_name={route_case_name}
						loadCaseByName={props.loadCaseByName}
						sellDrop={props.sellDrop} 
						win_drop_data={props.win_drop_data} 
						opening_status={props.opening_status} 
						open_button_status={props.open_button_status}
						roulette_drop={props.roulette_drop} 
						openCase={props.openCase} 
						sell_drop_button_status={props.sell_drop_button_status}
						case_data_by_name={props.case_data_by_name}
					/>
				: 
				(props.category_data.length) ?
					<Cases
						changeCaseCategory={props.changeCaseCategory}
						category_data={props.category_data}
						cases_data={props.cases_data}
						changeOpeningStatus={props.changeOpeningStatus}
					/>
					:
					<Preloader/>
			}
		</div>
	);
}

export default Index;