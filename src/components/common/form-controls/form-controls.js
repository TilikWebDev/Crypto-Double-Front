import React from 'react';

import s from './form-controls.module.css';

const FormControl = ({form, field, title, ...props}) => {
    let errors = form.errors[field.name];
    let touched = form.touched[field.name];

    return (
        <div className={['input_type_relative', s.input].join(' ')}>
            <p>
                {title}

                <span>
                   {errors && touched && ` - ${errors}`}
                </span>
            </p>

            {
                props.children
            }
        </div>
    );
}

export const Input = (props) => {
    return (
        <FormControl {...props}>
            <input {...props.field} type={props.type} />
        </FormControl>
    )
}

export const Textarea = (props) => {
    return (
        <FormControl {...props}>
            <textarea {...props.field} type={props.type} />
        </FormControl>
    )
}