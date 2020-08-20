import rollImage from '../img/roulette.jpg';

import {indexAPI} from '../api/api';

import {createNotification} from './notifications-reducer';
import {updateUserBalance} from './user-reducer';

const CHANGE_ON_FOCUS = 'CHANGE_ON_FOCUS';
const SET_USER_CURRENT_BET_STATUS = 'SET_USER_CURRENT_BET_STATUS';
const CHANGE_BET_AMOUNT = 'CHANGE_BET_AMOUNT';
const CALC_BET_AMOUNT = 'CALC_BET_AMOUNT';
const UPDATE_LEFT_TIME_STYLES = 'UPDATE_LEFT_TIME_STYLES';
const UPDATE_ROULETTE_STYLES = 'UPDATE_ROULETTE_STYLES';
const ROULETTE_RESIZE = 'ROULETTE_RESIZE';
const CLEAR_CHAT = 'CLEAR_CHAT';
const ON_CHANGE_CHAT_TEXT = 'ON_CHANGE_CHAT_TEXT';

const SOCKET_RESPONSE_NEW_BET = 'SOCKET_RESPONSE_NEW_BET';
const SOCKET_RESPONSE_NEW_MESSAGE= 'SOCKET_RESPONSE_NEW_MESSAGE';
const SOCKET_RESPONSE_START_GAME = 'SOCKET_RESPONSE_START_GAME';

let initialState = {
    user_data: {
        user_bet_amount: '',
        user_current_bet: false
    },
    chat_data: {
        on_focus: false,
        connection_count: 0,
        user_chat_text: '',
        chat_message_list: [
            {text: 'Socket connecting...', color: '#376fa2'}
        ]
    },
    roulette_data: {
        now_hash_round: 0,
        time_left_styles: {
            time_text: 'Waiting for the start of the game...',
            time_line_width: 0
        },
        roulette_styles: {
            backgroundImage: rollImage,
            transition: '5s',
            backgroundPositionX: 0
        },
        roulette_size: {
            width: 0,
            height: 0
        },
        last_numbers: [
            
        ]
    },
    total_bet_data: [

    ]
};


// ACTION_CREATORS

export const changeOnFocus = (value) => {
    return {
        type: CHANGE_ON_FOCUS,
        value: value
    }
}

export const rouletteResize = (width, height) => {
    return {
        type: ROULETTE_RESIZE,
        width: width,
        height: height
    }
}

export const updateRouletteStyles = (data) => {
    return {
        type: UPDATE_ROULETTE_STYLES,
        data: data
    }
}

export const updateLeftTimeStyles = (data) => {
    return {
        type: UPDATE_LEFT_TIME_STYLES,
        data: data
    }
}

export const onChangeBetAmount = (value) => {
    return {
        type: CHANGE_BET_AMOUNT,
        value: value
    }
}

export const onChangeChatText = (value) => {
    return {
        type: ON_CHANGE_CHAT_TEXT,
        value: value
    }
}

export const calcBetAmount = (value) => {
    return {
        type: CALC_BET_AMOUNT,
        value: value
    }
}

export const clearChat = () => {
    return {
        type: CLEAR_CHAT
    }
}

export const setUserCurrentBetStatus = (status) => {
    return {
        type: SET_USER_CURRENT_BET_STATUS,
        status: status
    }
}

export const socketSetNewMessage = (data) => {
    return {
        type: SOCKET_RESPONSE_NEW_MESSAGE,
        data: data
    }
}

export const socketSetNewBet = (data) => {
    return {
        type: SOCKET_RESPONSE_NEW_BET,
        data: data
    }
}

export const socketSetStartGame = (data) => {
    return {
        type: SOCKET_RESPONSE_START_GAME,
        data: data
    }
}

//THUNK_ACTION_CREATORS

export const sendChatMessage = (text) => {
    return (dispatch) => {
        indexAPI.postChatMessage(text).then(data => {
            if (data.error) {
                dispatch(createNotification(data.message, 'error'));
            } else {
                dispatch(onChangeChatText(''));
            }
        })
    }
}

export const createBet = (amount, color) => {
    return (dispatch) => {
        indexAPI.postMyBet(amount, color).then(data => {
            if (data.error) {
                dispatch(createNotification(data.message, 'error'));
            } else {
                dispatch(socketSetNewBet({amount: amount, color: color}));
                dispatch(createNotification('Bet confirm! (' + data.user_count_bets_on_this_round + ' / 3)', 'success'));
                dispatch(setUserCurrentBetStatus(true));
                dispatch(updateUserBalance(amount, '-'));
            }
        })
    }
}

export const getBalance = () => {
    return  (dispatch) => {
        indexAPI.getBalance().then(data => {
            if (data.error) {
                dispatch(createNotification(data.message, 'error'));
            } else {
                dispatch(updateUserBalance(data.balance));
            }
        })
    }
}

export const spinRoulette = (number, section, bpx, width, height, needRefreshBalance) => {
    return (dispatch) => {
        let numberArray = [1,14,2,13,3,12,4,0,11,5,10,6,9,7,8];

        let currentPosition = parseFloat(bpx);

        let newPosition = width - currentPosition;
        let newSection = Math.ceil(height / 100 * section);
        
        for (const [index, el] of numberArray.entries()) {
            if ( el == number ) {
                newPosition = index * height + newSection + Math.ceil(width / 2) + (width * Math.ceil(Math.random() * (10 - 3) + 3));
                break;
            };
        }

        dispatch(updateRouletteStyles({
            backgroundPositionX: -newPosition,
            transition: '7s'
        }));

        setTimeout(function(){
            dispatch(updateLeftTimeStyles({
                time_text: 'Win number: ' + number,
                time_line_width: 0
            }));

            newPosition = newPosition % width;

            dispatch(updateRouletteStyles({
                backgroundPositionX: -newPosition,
                transition: ''
            }));

            if (needRefreshBalance) {
                dispatch(getBalance());
            }
        }, 7000);
    }
}

export const startGame = (seconds) => {
    return (dispatch) => {
        let startTime = new Date();

        let text = parseFloat(seconds) || 0;
        let width = 0;

        if (!isNaN(text) && text > 0) {
            let i = setInterval(() => {
                let curTime = new Date();
                let delta = curTime.getTime() - startTime.getTime();

                if (delta > seconds * 1000) {
                    clearInterval(i);
                    startTime = new Date();

                    dispatch(updateLeftTimeStyles({
                        time_text: '*** ROLL ***',
                        time_line_width: 0
                    }));
                } else {
                    text = seconds - (delta / 1000 - 0.01);
                    width = (text / 15) * 100;

                    dispatch(updateLeftTimeStyles({
                        time_text: text.toFixed(2),
                        time_line_width: width
                    }));
                }
            }, 10);
        }
    }
}

const indexReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHANGE_ON_FOCUS: 
            return {
                ...state,
                chat_data: {
                    ...state.chat_data,
                    on_focus: action.value
                }
            }

        case ON_CHANGE_CHAT_TEXT:
            return {
                ...state,
                chat_data: {
                    ...state.chat_data,
                    user_chat_text: action.value
                }
            };

        case SET_USER_CURRENT_BET_STATUS:
            return {
                ...state,
                user_data: {
                    ...state.user_data,
                    user_current_bet: true
                }
            };

        case UPDATE_ROULETTE_STYLES:
            return {
                ...state,
                roulette_data: {
                    ...state.roulette_data,
                    roulette_styles: {
                        ...state.roulette_data.roulette_styles,
                        ...action.data
                    }
                }
            };
        
        case ROULETTE_RESIZE:
            return {
                ...state,
                roulette_data: {
                    ...state.roulette_data,
                    roulette_size: {
                        width: action.width,
                        height: action.height
                    }
                }
            };

        case CALC_BET_AMOUNT:
            return {
                ...state,
                user_data: {
                    ...state.user_data,
                    user_bet_amount: action.value
                }
            };

        case CHANGE_BET_AMOUNT:
            return {
                ...state,
                user_data: {
                    ...state.user_data,
                    user_bet_amount: action.value
                }
            };

        case UPDATE_LEFT_TIME_STYLES:
            return {
                ...state,
                roulette_data: {
                    ...state.roulette_data,
                    time_left_styles: {
                        ...state.roulette_data.time_left_styles,
                        time_text: action.data.time_text,
                        time_line_width: action.data.time_line_width
                    }
                }
            };
        
        case CLEAR_CHAT:
            return {
                ...state,
                chat_data: {
                    ...state.chat_data,
                    chat_message_list: [

                    ]
                }
            };

        case SOCKET_RESPONSE_NEW_MESSAGE:
            return {
                ...state,
                chat_data: {
                    ...state.chat_data,
                    chat_message_list: [
                        ...state.chat_data.chat_message_list.slice(state.chat_data.chat_message_list.length - 102, state.chat_data.chat_message_list.length),
                        {user: action.data.user, text: action.data.text, color: action.data.color}
                    ]
                }
            };

        case SOCKET_RESPONSE_NEW_BET:
            return {
                ...state,
                total_bet_data: [ 
                    ...state.total_bet_data, 
                    {email: action.data.email, amount: action.data.amount, color: action.data.color}
                ]
            };

        case SOCKET_RESPONSE_START_GAME:
                return {
                    ...state,
                    chat_data: {
                        ...state.chat_data,
                        connection_count: action.data.connection_count
                    },
                    roulette_data: {
                        ...state.roulette_data, 
                        now_hash_round: action.data.hash_round,
                        last_numbers: [
                            ...action.data.lastresults.map((c) => {
                                if (c.win_number === 0) return {color: 'green', value: c.win_number, hash: c.hash_round};
                                if (c.win_number > 7) return {color: 'black', value: c.win_number, hash: c.hash_round};
                                return {color: 'red', value: c.win_number, hash: c.hash_round};
                            })
                        ]
                    },
                    total_bet_data: [
                        ...action.data.bets_on_this_round
                    ]
                };
        
        default: 
            return state;
    }
}

export default indexReducer;