import React from 'react';
import PARTticketShow from './PART_ticket_show';
import PARTticketList from './PART_ticket_list';

const Support = () => {
	return (
		<div className="container tickets">
			<PARTticketShow/>
			<PARTticketList/>
		</div>
	);
}

export default Support;