import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>
                    {label}
                    <input {...input} type='text' autoComplete='off' />
                    {this.renderError(meta)}
                </label>
            </div>
        );
    }

    renderError({ error, touched }) {
        return error && touched ? (
            <div className='ui error message'>
                {error}
            </div>
        ) : null;
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }
    
    render() {
        return (
            <form
                className='ui form error'
                onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                    name='title'
                    component={this.renderInput}
                    label='Enter title' />
                <Field
                    name='description'
                    component={this.renderInput}
                    label='Enter description' />
                <button className='ui primary button'>Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter the title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter the description';
    }

    return errors;
}

export default reduxForm({
    form: 'StreamForm',
    validate: validate
})(StreamForm);