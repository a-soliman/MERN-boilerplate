import React from 'react';
import FormField from './FormField';

const Form = ({ fields = [], onChangleHandler, onSubmitHandler }) => {
    return (
        <form onSubmit={onSubmitHandler}>
            {fields.map((field, i) => <FormField key={i} field={field} onChangeHandler={onChangleHandler} />)}
            <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
    );
};

export default Form;