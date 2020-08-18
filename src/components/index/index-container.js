import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket } from "websocket";
import { withRouter, useLocation } from 'react-router-dom';

import Index from './index';

import {onChangeBetAmount, calcBetAmount, socketSetNewMessage, socketSetNewBet, socketSetStartGame, getBalance, rouletteResize, clearChat, startGame, spinRoulette, createBet, sendChatMessage, onChangeChatText} from '../../redux/index-reducer';
import {showModal} from '../../redux/modal-window-reducer';

const websocket = new w3cwebsocket('ws://' + '91.240.84.47' + ':3012');

const IndexContainer = (props) => {

    let location = useLocation()

    useEffect(() => {
        if (props.match.params.name) {
            props.showModal(props.match.params.name);
        }
    }, [location]);

    useEffect(() => {
        websocket.onopen = () => {
            props.socketSetNewMessage({
                text: 'Socket connected!',
                color: '#5cc46d'
            });
        };
    
        websocket.onclose = () => {
            props.socketSetNewMessage({
                text: 'Socket disconected.',
                color: '#ee5953'
            });
        };
    
        websocket.onmessage = (message) => {
            let data = JSON.parse(message.data);
    
            switch (data.type) {
                case 'new_bet':
                    props.socketSetNewBet(data)
                    break;
    
                case 'chat_new_msg':
                    props.socketSetNewMessage(data)
                    break;
    
                case 'game':
                    if (data.game_status === 'start') {
                        props.socketSetStartGame(data);
                        props.startGame(data.timer);
                    } else {
                        props.spinRoulette(
                            data.win_number,
                            data.win_number_section,
                            props.roulette_data.roulette_styles.backgroundPositionX,
                            props.roulette_data.roulette_size.width,
                            props.roulette_data.roulette_size.height,
                            props.user_current_bet
                        );
                    }
                    break;
            }
        };
    }, [websocket, props.roulette_data]);

    const onCreateBet = (color) => {
        props.createBet(props.action_data.user_bet_amount, color);
    }

    return 	(
        <Index
            user_balance={props.user_balance}
            chat_message_list={props.chat_message_list}
            user_chat_text={props.user_chat_text}
            connection_count={props.connection_count}
            time_text={props.roulette_data.time_text}
            time_line_width={props.roulette_data.time_line_width}
            roulette_styles={props.roulette_data.roulette_styles}
            last_numbers={props.roulette_data.last_numbers}
            user_bet_amount={props.action_data.user_bet_amount}
            total_bet_data={props.total_bet_data}
            now_hash_round={props.now_hash_round}

            onCreateBet={onCreateBet}
            getBalance={props.getBalance}
            clearChat={props.clearChat}
            onChangeBetAmount={props.onChangeBetAmount} 
            calcBetAmount={props.calcBetAmount} 
            rouletteResize={props.rouletteResize}
            showModal={props.showModal}
            onChangeChatText={props.onChangeChatText}
            sendChatMessage={props.sendChatMessage}
        />
    );
}

let mapStateToProps = (state) => {
	return {
        user_balance: state.index_page.user_balance,
		user_current_bet: state.index_page.user_current_bet,
		connection_count: state.index_page.connection_count,
        chat_message_list: state.index_page.chat.chat_message_list,
        user_chat_text: state.index_page.chat.user_chat_text,
		roulette_data: state.index_page.roulette_data,
		action_data: state.index_page.action_data,
        total_bet_data: state.index_page.total_bet_data,
        user_total_bet_data: state.index_page.user_total_bet_data,
        now_hash_round: state.index_page.now_hash_round,

        user_is_auth: state.auth.is_auth
	};
}

let withUrlDataContainerComponent = withRouter(IndexContainer);

export default connect(mapStateToProps, {
	onChangeBetAmount,
	calcBetAmount,
	socketSetNewMessage,
	socketSetNewBet,
	socketSetStartGame,
	rouletteResize,
	clearChat,
    showModal,
    spinRoulette,
    startGame,
    getBalance,
    createBet,
    sendChatMessage,
    onChangeChatText
})(withUrlDataContainerComponent);