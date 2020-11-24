import React from 'react';
import Cases from './cases/cases';
import LastDrops from './last-drops/last-drops';

const Index = (props) => {
	return 	(
		<div className="container">
			<LastDrops
				last_drop={props.last_drop}
			/>
            
			<Cases
				cases={props.cases}
			/>
		</div>
	);
}

export default Index;