import React from 'react';
import s from '../modal-window.module.css';

const Login = (props) => {

    let active = (props.active) ? s.active : '';
    let email = React.createRef();
    let password = React.createRef();

    const onSubmitForm = (e) => {
        e.preventDefault();
        props.userLogin();
    }

    return (
        <form className={s.modal_window_content + ' ' + active} onSubmit={onSubmitForm}>
            <div className={s.modal_window_header}>
                <span className={s.modal_window_name}> 
                    Login To Your Account
                </span>

                <i onClick={props.hideModal}  className={'fa fa-times ' + s.modal_close}></i>
            </div>
        
            <div className={s.modal_window_body}>
                <div className={'input_type_relative ' + s.modal_input}>
                    <p>Email</p>
                    <input onChange={ () => props.onChangeLoginEmail(email.current.value)} value={props.email} ref={email}></input>
                </div>
                
                <div className={'input_type_relative ' + s.modal_input + ' ' + s.last}>
                    <p>Password</p>
                    <input type={'password'} onChange={ () => props.onChangeLoginPassword(password.current.value) } value={props.password} ref={password}></input>
                </div>
        
                <div className={s.last_btn}>
                    <button type={'submit'} className={'default_btn primary'}>Login</button>
                </div>
                
                <div className={s.links}>
                    <button type={'button'} className={'type_link'} onClick={() => props.showModal('register')}>Register</button>
                    <button type={'button'} className={'type_link'} onClick={() => props.showModal('forgot_password')}>Forgot Password?</button>
                </div>
            </div>
        </form> 
    );
}

export default Login;