import React from 'react';

const Message = () => {
	return (
		null
	);
}

const PARTticketList = () => {
	return (
		<div className="tickets_msg no_active">
			<div className="header">
				<h1 className="default_headline row">
					Ticket view
					<button className="default_btn">Close ticket</button>
				</h1>
				
				<div className="row">
					Subject
					<span>
						Theme
					</span>
				</div>

				<div className="row">
					Open date
					<span>
						10/05/1998 12:59
					</span>
				</div>

				<div className="row">
					Status
					<span className="{{ ticket_data.class_name_for_status }}">
						Open
					</span>
				</div>
			</div>

			<div className="body">
				<div className="scroll_container">
				    <div className="empty">
				    	Empty
				    </div>
				</div>
			</div>

			<form className="footer">
				<div className="input_type_relative">
					<textarea placeholder="Enter your message"></textarea>
				</div>

				<button className="default_btn">
					<i className="fa fa-paper-plane" aria-hidden="true"></i>
				</button>
			</form>
		</div>
	);
}

export default PARTticketList;