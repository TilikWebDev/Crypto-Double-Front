import React from 'react';

const Deposit = () => {
	return (
		<div className="container flex_column">
			<div className="info_block">
				<div className="header">
					Deposit
				</div>

				<div className="body">
					<form  method="GET" action="deposit_value">
						<div className="input_type_relative">
							<p>Currency</p>
							<select name="currency">
								<option value="uah">UAH</option>
							</select>
						</div>
						
						<div className="input_type_relative">
							<p>Value</p>
							<input name="value"/>
						</div>

						<div className="input_type_relative">
							<p>Promocode</p>
							<input name="promocode"/>
						</div>

						<div className="last_btn">
							<button type="submit" className="default_btn high">Deposit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Deposit;