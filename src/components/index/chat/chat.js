import React, { useEffect, useRef } from 'react';
import s from './chat.module.css';

const chatContainer = React.createRef();

const Chat = (props) => {

	const user_chat_text = React.createRef();

	const onChangeChatText = () => {
		props.onChangeChatText(user_chat_text.current.value);
	}

	const onSubmitChatForm = (e) => {
		e.preventDefault();
		props.sendChatMessage(props.user_chat_text);
	}

	const scrollToMyRef = () => {
		let scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
		chatContainer.current.scrollTo(0, scroll);
	};

	useEffect(scrollToMyRef, [props.chat_message_list]);

	let messages = props.chat_message_list.map((m, index) => { 
		let style = (m.user) ? s.msg : s.msg + ' ' + s.system;
		
		return (
			<p key={index} className={style}>
				<b>{m.user}</b>
				<i style={{backgroundColor: m.color}}></i>
				<span>{m.text}</span>
			</p>
		)
	});

	return (
		<div className={s.main}>
			<div className={s.body}>
				<div className={s.container} ref={chatContainer}>
					{messages}
				</div>
			</div>

			<form className={s.form} action="chat" onSubmit={onSubmitChatForm}>
				<input onChange={onChangeChatText} placeholder="Type here to chat..." name="text" type="text" value={props.user_chat_text} ref={user_chat_text}/>

				<button type="submit">
					<i className="fa fa-commenting" aria-hidden="true"></i>
				</button>
			</form>

			<div className={s.footer}>
				<p>Users Online: {props.connection_count}</p>
				<button className={'type_link ' + s.link} onClick={() => props.showModal('chat_rules')}>Chat rules</button>
				<button className={'type_link ' + s.link} onClick={props.clearChat}>Clear chat</button>
			</div>
		</div>
	);
}

export default Chat;