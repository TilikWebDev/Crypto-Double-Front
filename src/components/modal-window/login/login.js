import React from 'react';
import PropTypes from 'prop-types';

import s from '../modal-window.module.css';

import { Field, Formik } from 'formik';
import { validateEmail, validatePassword } from '../../../utils/validators/validators';
import { Input } from '../../common/form-controls/form-controls';

const Login = (props) => {

    const onSubmit = (values, {setStatus}) => {
        props.userLogin(values.email, values.password, setStatus)
    };

    return (
        <Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit}>
            {
                ({handleSubmit, status}) => (
                    <form onSubmit={handleSubmit} className={[s.modal_window_content, (props.active) ? s.active : ''].join(' ')}>
                        <div className={s.modal_window_header}>
                            <span className={s.modal_window_name}> 
                                Login To Your Account
                            </span>

                            <i onClick={props.hideModal}  className={['fa fa-times', s.modal_close].join(' ')}></i>
                        </div>
                    
                        <div className={s.modal_window_body}>
                            {
                                (status) &&
                                    <div className={s.modal_error}>
                                        {status}
                                    </div>                                
                            }

                            <Field title={'Email'} name={'email'} component={Input} validate={validateEmail}/>
                            <Field title={'Password'} name={'password'} type={'password'} component={Input} validate={validatePassword}/>
                    
                            <div className={s.last_btn}>
                                <button className={'default_btn primary'}>Login</button>
                            </div>
                            
                            <div className={s.links}>
                                <button type={'button'} className={'type_link'} onClick={() => props.showModal('register')}>Register</button>
                                <button type={'button'} className={'type_link'} onClick={() => props.showModal('forgot_password')}>Forgot Password?</button>
                            </div>
                        </div>
                    </form> 
                )
            }
        </Formik>
    )
}

Login.propTypes = {
    active: PropTypes.bool,
    userLogin: PropTypes.func,
    hideModal: PropTypes.func,
    showModal: PropTypes.func
};

export default Login;