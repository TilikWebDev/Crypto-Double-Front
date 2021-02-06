import React from 'react';
import PropTypes from 'prop-types';

import s from '../modal-window.module.css';

import { Field, Formik } from 'formik';
import { validateEmail, validatePassword } from '../../../utils/validators/validators';
import { Input } from '../../common/form-controls/form-controls';

const Register = ({active, userRegister, hideModal, showModal}) => {

    let _active = (active) ? s.active : '';

    const onSubmit = (values, {setStatus}) => userRegister(values.email, values.password, values.passwordVerify, setStatus);

    return (
        <Formik initialValues={{email: '', password: '', passwordVerify: ''}} onSubmit={onSubmit}>
            {
                ({handleSubmit, status}) => (
                    <form className={[s.modal_window_content, _active].join(' ')} onSubmit={handleSubmit}>
                        <div className={s.modal_window_header}>
                            <span className={s.modal_window_name}> 
                                Register new account
                            </span>

                            <i onClick={hideModal}  className={['fa fa-times ', s.modal_close].join(' ')}></i>
                        </div>
                    
                        <div className={s.modal_window_body}>
                            {
                                (status) &&
                                    <div className={s.modal_error}>
                                        {status}
                                    </div>                                
                            }

                            <Field title={'Email'} name={'email'} component={Input} validate={validateEmail}/>
                            <Field title={'Password'} name={'password'} component={Input} type={'password'} validate={validatePassword}/>
                            <Field title={'Password confirm'} name={'passwordVerify'} component={Input} type={'password'} validate={validatePassword}/>
                    
                            <div className={s.last_btn}>
                                <button className={'default_btn primary'}>Register</button>
                            </div>
                            
                            <div className={s.links}>
                                <button type={'button'} className={'type_link'} onClick={() => showModal('login')}>Have an account?</button>
                            </div>
                        </div>
                    </form> 
                )
            }
        </Formik>
    );
}

Register.propTypes = {
    active: PropTypes.bool, 
    userRegister: PropTypes.func, 
    hideModal: PropTypes.func, 
    showModal: PropTypes.func
}

export default Register;