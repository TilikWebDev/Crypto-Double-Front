import React from 'react';

const Ticket = (props) => {
	return (
		<a href={"/support/ticket_view?id=" + props.name} className={"ticket_cld " + props.status}>
			<span className="date">
				{props.date}
			</span>

			<p className="name">
				{props.subject}
			</p>
		</a>
	);
}

const PARTticketShow = () => {
	return (
		<div className="tickets_all">
			<h1 className="default_headline">
				Tickets
			</h1>

			<p className="text">Didn't find a solution? Write us, we will help You!</p>

			<a href="/support/new_ticket" className="new_ticket default_btn">Open new ticket</a>

			<div className="body">
				<div className="scroll_container">
					<Ticket name="3" status="active" date="2004-04-13" subject="zdarova"/>
				</div>
			</div>
		</div>
	);
}

export default PARTticketShow;