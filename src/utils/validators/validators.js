export const customFieldLevelValidation = (value, validations) => {
    for (let validation of validations) {
        const result = validation(value);

        if (result)
            return result;
    }

    return undefined;
}

export const required = (value) => {
    return (!value) ? 'Field is required' : undefined; 
}

export const maxLength = (length) => {
    return (value) => {
        return (value.length > length) ? `Max length is ${length}` : undefined;
    }
}

export const minLength = (length) => {
    return (value) => {
        return (value.length < length) ? `Min length is ${length}` : undefined;
    }
}

// CUSTOM VALIDATORS

export const validateEmail = (value) => customFieldLevelValidation(value, [required, maxLength(30)]);
export const validatePassword = (value) => customFieldLevelValidation(value, [required, minLength(8)]);