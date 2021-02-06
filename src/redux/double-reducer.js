import rollImage from '../img/roulette.jpg';

import {doubleAPI} from '../api/api';

import {createNotification} from './notifications-reducer';
import {updateUserBalance} from './user-reducer';

const SET_USER_CURRENT_BET_STATUS = 'SET_USER_CURRENT_BET_STATUS';
const CHANGE_BET_AMOUNT = 'CHANGE_BET_AMOUNT';
const CALC_BET_AMOUNT = 'CALC_BET_AMOUNT';
const UPDATE_LEFT_TIME_STYLES = 'UPDATE_LEFT_TIME_STYLES';
const UPDATE_ROULETTE_STYLES = 'UPDATE_ROULETTE_STYLES';
const ROULETTE_RESIZE = 'ROULETTE_RESIZE';
const CLEAR_CHAT = 'CLEAR_CHAT';
const CHANGE_BET_CONTAINER_RESULTS = 'CHANGE_BET_CONTAINER_RESULTS';

const SOCKET_RESPONSE_NEW_BET = 'SOCKET_RESPONSE_NEW_BET';
const SOCKET_RESPONSE_NEW_MESSAGE= 'SOCKET_RESPONSE_NEW_MESSAGE';
const SOCKET_RESPONSE_START_GAME = 'SOCKET_RESPONSE_START_GAME';

let initialState = {
    user_data: {
        user_bet_amount: 0,
        user_current_bet: false
    },
    chat_data: {
        connection_count: 0,
        user_chat_text: '',
        chat_message_list: [
            
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

    ],
    bet_container: {
        red: 'default',
        black: 'default',
        green: 'default'
    }
};


// ACTION_CREATORS

export const changeBetContainerResults = color => {
    return {
        type: CHANGE_BET_CONTAINER_RESULTS,
        color
    }
}

export const rouletteResize = (width, height) => {
    return {
        type: ROULETTE_RESIZE,
        width,
        height
    }
}

export const updateRouletteStyles = data => {
    return {
        type: UPDATE_ROULETTE_STYLES,
        data
    }
}

export const updateLeftTimeStyles = data => {
    return {
        type: UPDATE_LEFT_TIME_STYLES,
        data
    }
}

export const onChangeBetAmount = value => {
    return {
        type: CHANGE_BET_AMOUNT,
        value
    }
}

export const calcBetAmount = value => {
    return {
        type: CALC_BET_AMOUNT,
        value
    }
}

export const clearChat = () => {
    return {
        type: CLEAR_CHAT
    }
}

export const setUserCurrentBetStatus = status => {
    return {
        type: SET_USER_CURRENT_BET_STATUS,
        status
    }
}

export const socketSetNewMessage = data => {
    return {
        type: SOCKET_RESPONSE_NEW_MESSAGE,
        data
    }
}

export const socketSetNewBet = data => {
    return {
        type: SOCKET_RESPONSE_NEW_BET,
        data
    }
}

export const socketSetStartGame = data => {
    return {
        type: SOCKET_RESPONSE_START_GAME,
        data
    }
}

//THUNK_ACTION_CREATORS

export const sendChatMessage = (text) => {
    return (dispatch) => {
        doubleAPI.postChatMessage(text).then(
            ({error, message}) => {
                if (error) {
                    dispatch(createNotification(message, 'error'));
                }
            }
        )
    }
}

export const createBet = (amount, color) => {
    return (dispatch) => {
        doubleAPI.postMyBet(amount, color).then(
            ({error, message, user_count_bets_on_this_round}) => {
                if (error) {
                    dispatch(createNotification(message, 'error'));
                } else {
                    dispatch(socketSetNewBet({amount, color}));
                    dispatch(createNotification(`Bet confirm! (${user_count_bets_on_this_round} / 3)`, 'success'));
                    dispatch(setUserCurrentBetStatus(true));
                    dispatch(updateUserBalance(amount, '-'));
                }
            }
        )
    }
}

export const getBalance = () => {
    return  (dispatch) => {
        doubleAPI.getBalance().then(
            ({error, message, balance}) => {
                if (error) {
                    dispatch(createNotification(message, 'error'));
                } else {
                    dispatch(updateUserBalance(balance));
                }
            }
        )
    }
}

export const spinRoulette = (number, section, bpx, width, height, needRefreshBalance) => {
    return (dispatch) => {
        const numberArray = [1,14,2,13,3,12,4,0,11,5,10,6,9,7,8];

        let currentPosition = parseFloat(bpx);

        let newPosition = width - currentPosition;
        let newSection = Math.ceil(height / 100 * section);

        let color_win_number = 'green';

        if (number > 0) color_win_number = 'red';
        if (number > 7) color_win_number = 'black';

        numberArray.map((e, index) => {
            return (e === number) ?
                newPosition = index * height + newSection + Math.ceil(width / 2) + (width * Math.ceil(Math.random() * (10 - 3) + 3))
                :
                true;
        });

        dispatch(updateRouletteStyles({
            backgroundPositionX: -newPosition,
            transition: '7s'
        }));

        setTimeout(() => {
            dispatch(changeBetContainerResults(color_win_number));

            dispatch(updateLeftTimeStyles({
                time_text: 'Win number: ' + number,
                time_line_width: 0
            }));

            newPosition = newPosition % width;

            dispatch(updateRouletteStyles({
                backgroundPositionX: -newPosition,
                transition: ''
            }));

            needRefreshBalance && dispatch(getBalance());
        }, 7000);
    }
}

export const startGame = (seconds) => {
    return (dispatch) => {
        let startTime = new Date();

        let text = parseFloat(seconds) || 0;
        let width = 0;

        dispatch(changeBetContainerResults('default'));

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

const doubleReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHANGE_BET_CONTAINER_RESULTS:
            return (action.color !== 'default') ? 
            {
                ...state,
                bet_container: {
                    red: (action.color === 'red') ? 'win' : 'lose',
                    black: (action.color === 'black') ? 'win' : 'lose',
                    green: (action.color === 'green') ? 'win' : 'lose',
                }
            } 
            : 
            {
                ...state,
                bet_container: {
                    red: 'default',
                    black: 'default',
                    green: 'default'
                }
            }

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

export default doubleReducer;

//ES6