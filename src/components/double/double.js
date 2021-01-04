import React from 'react';

import Chat from './chat/chat';
import Roulette from './roulette/roulette';
import LastNumbers from './last-numbers/last-numbers';
import LeftTime from './left-time/left-time';
import BetForm from './bet-form/bet-form';
import AllBets from './all-bets/all-bets';

const Double = (props) => {
	return 	(
		<div className="container">
			<div className="left_bar"> 
				<Chat 
					chat_on_focus={props.chat_on_focus}
					chat_message_list={props.chat_message_list}
					connection_count={props.connection_count}
					user_chat_text={props.user_chat_text}
					clearChat={props.clearChat}
					showModal={props.showModal}
					changeOnFocus={props.changeOnFocus}
					onChangeChatText={props.onChangeChatText}
					sendChatMessage={props.sendChatMessage}
				/>
			</div>

			<div className="main_bar">

				<LeftTime time_text={props.time_text} time_line_width={props.time_line_width}/>
				<Roulette rouletteResize={props.rouletteResize} roulette_styles={props.roulette_styles } />
				<LastNumbers now_hash_round={props.now_hash_round} last_numbers={props.last_numbers}/>

				<BetForm 
					user_balance={props.user_balance} 
					user_bet_amount={props.user_bet_amount} 

					getBalance={props.getBalance}
					onChangeBetAmount={props.onChangeBetAmount} 
					calcBetAmount={props.calcBetAmount} 
					updateUserBalance={props.updateUserBalance} 
				/>

				<AllBets bet_container={props.bet_container} onChangeBetAmount={props.onChangeBetAmount}  onCreateBet={props.onCreateBet} total_bet_data={props.total_bet_data}/>
			</div>
		</div>
	);
}

export default Double;