import React from 'react';
import classnames from 'classnames';

const FormField = ({ field, onChangeHandler }) => {
    const generateInputField = () => {
        let template;
        switch (field.type) {
            case 'select':
                template = <select
                    value={field.value}
                    onChange={onChangeHandler}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': field.validationMessage
                    })}
                >
                    {
                        field.options.map(option => (<option value={option}>{option}</option>))
                    }
                </select>

            default:
                template = <input
                    type={field.type}
                    value={field.value}
                    name={field.name}
                    onChange={onChangeHandler}
                    placeholder={field.placeholder}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': field.validationMessage
                    })}
                />
        }

        return template;
    };

    return (
        <div className="form-group">
            {generateInputField()}
            {field.validationMessage && (<div className="invalid-feedback">{field.validationMessage}</div>)}
        </div>
    );
};

export default FormField;