import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from "../actions";

class PostsNew extends Component {

    renderField(field) {

        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className='text-help'>{touched ? error : ''}</div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            console.log('Callback callled');
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title" name="title" component={this.renderField}/>
                <Field label="Categories" name="categories" component={this.renderField}/>
                <Field label="Post Content" name="content" component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    // console.log(values) -> Object { title: 'x', categories: 'y', content: 'z' }
    const errors = {};

    // Validate the inputs from the values object
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is at least three characters';
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }
    if (!values.content) {
        errors.content = 'Enter some content';
    }

    // If errors is empty, the form is fine to submit - Passes validation
    // If errors is not empty, redux-form assumes the form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm-MustBeUnique'
})(
    connect(null,{createPost})(PostsNew)
);