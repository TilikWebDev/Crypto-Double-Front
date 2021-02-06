import React, { useEffect, useState, createRef } from 'react';
import { Field, Formik } from 'formik';
import PropTypes from 'prop-types';

import s from './chat.module.css';

const Chat = ({sendChatMessage, chat_message_list, connection_count, showModal, clearChat}) => {

	const chatContainer = createRef();

	const onSubmit = (data, {resetForm}) => {
		sendChatMessage(data.text);
		resetForm({});
	}

	const [focus, setFocus] = useState(false);

	const scrollToMyRef = () => {
		let scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
		chatContainer.current.scrollTo(0, scroll);
	};

	useEffect(() => {
		(!focus) && scrollToMyRef();
	}, [chat_message_list]);

	return (
		<section className={s.main}>
			<div className={s.body}>
				<div onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)} className={s.container} ref={chatContainer}>
					{
						chat_message_list.map((m, index) =>
							<p key={index} className={s.msg}>
								<b>{m.user}</b>
								<i style={{backgroundColor: m.color}}></i>
								<span>{m.text}</span>
							</p>
						)
					}
				</div>
			</div>

			<Formik initialValues={{text: ''}} onSubmit={onSubmit}>
				{
					({handleSubmit}) => (
						<form className={s.form} onSubmit={handleSubmit}>
							<Field name={'text'} placeholder={'Сообщение...'} component={'input'}/>

							<button className={s.send}>
								<i className={'fa fa-commenting'} aria-hidden="true"></i>
							</button>
						</form>
					)
				}		
			</Formik>
			
			<div className={s.footer}>
				<p>Онлайн: {connection_count}</p>
				<button className={['type_link', s.link].join(' ')} onClick={() => showModal('chat_rules')}>Правила чата</button>
				<button className={['type_link', s.link].join(' ')} onClick={clearChat}>Очистить чат</button>
			</div>
		</section>
	);
}

Chat.propTypes = {
	sendChatMessage: PropTypes.func, 
	chat_message_list: PropTypes.array, 
	connection_count: PropTypes.number, 
	showModal: PropTypes.func, 
	clearChat: PropTypes.func
}

export default Chat;