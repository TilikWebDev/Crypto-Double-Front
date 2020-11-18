import React from 'react';
import s from '../modal-window.module.css';

const Register = (props) => {

    let active = (props.active) ? s.active : '';
    let email = React.createRef();
    let password = React.createRef();
    let password2 = React.createRef();
    const onSubmitForm = (e) => {
        e.preventDefault();
        props.userRegister();
    }

    return (
        <form className={s.modal_window_content + ' ' + active} onSubmit={onSubmitForm}>
            <div className={s.modal_window_header}>
                <span className={s.modal_window_name}> 
                    Register new account
                </span>

                <i onClick={props.hideModal}  className={'fa fa-times ' + s.modal_close}></i>
            </div>
        
            <div className={s.modal_window_body}>
                <div className={'input_type_relative ' + s.modal_input}>
                    <p>Email</p>
                    <input onChange={ () => props.onChangeRegisterEmail(email.current.value)} value={props.email} ref={email}></input>
                </div>
                
                <div className={'input_type_relative ' + s.modal_input}>
                    <p>Password</p>
                    <input type={'password'} onChange={ () => props.onChangeRegisterPassword(password.current.value) } value={props.password} ref={password}></input>
                </div>

                <div className={'input_type_relative ' + s.modal_input + ' ' + s.last}>
                    <p>Confirm password</p>
                    <input type={'password'} onChange={ () => props.onChangeRegisterPassword2(password2.current.value) } value={props.password2} ref={password2}></input>
                </div>
        
                <div className={s.last_btn}>
                    <button type={'submit'} className={'default_btn primary'}>Register</button>
                </div>
                
                <div className={s.links}>
                    <button type={'button'} className={'type_link'} onClick={() => props.showModal('login')}>Have an account?</button>
                </div>
            </div>
        </form> 
    );
}

export default Register;