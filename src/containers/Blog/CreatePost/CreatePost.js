import React, { Component } from 'react';
import axios from 'axios';
import Auxiliary from '../../../hoc/Auxiliary';
import './CreatePost.css';
import Modal from '../../../components/UI/Modal/Modal';
import FormErrors from '../../../components/UI/FormError/FormError';

class CreatePost extends Component {
    state = {
        name: '',
        password: '',
        email: '',
        mobile: '',
        formErrors: { name: '', password: '', email: '', mobile: '' },
        isValid: { name: false, password: false, email: false, mobile: false },
        isFormValid: false,
        submitted: false
    }

    postDataHandler = () => {
        const data = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            mobile: this.state.mobile
        };
        axios.post('/posts', data)
            .then(response => {
                this.setState({ submitted: true });
            });
    }

    showCancelHandler = () => {
        this.setState({ submitted: false });
    }

    handleUserInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = { ...this.state.formErrors };
        let isValid = { ...this.state.isValid };

        switch (fieldName) { 
            case 'name':
                isValid.name = value.match(/^[A-Z\s]+$/gi);
                fieldValidationErrors.name = isValid.name ? '' : ' is invalid';
                break;
            case 'email':
                isValid.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = isValid.email ? '' : ' is invalid';
                break;
            case 'password':
                isValid.password = value.length >= 6;
                fieldValidationErrors.password = isValid.password ? '' : ' should be minimum 6 letters long';
                break;
            case 'mobile':
                isValid.mobile = value.match(/^(\+?[1-9]{1}[0-9]{0,2})?[1-9]{1}[0-9]{9}$/g);
                fieldValidationErrors.mobile = isValid.mobile ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            isValid: isValid,
        }, this.validateForm);
    }

    validateForm = () => {
        let isFormValid = true;
        for(let inputField in this.state.isValid) {
            isFormValid = this.state.isValid[inputField] && isFormValid;
        }
        this.setState({ isFormValid: isFormValid });
    }

    render() {
        return (
            <Auxiliary>
                <Modal show={this.state.submitted} modalClosed={this.showCancelHandler}>
                    <div className="CreatePost">
                        <h1> About Yourself </h1>
                        <label>Your Name : {this.state.name}</label>
                        <label>Your Password: {this.state.password}</label>
                        <label>Your Email: {this.state.email}</label>
                        <label>Your Mobile Number: {this.state.mobile} </label>
                    </div>
                </Modal>
                <div className="CreatePost">
                    <h1>Fill the form</h1>
                    <div >
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleUserInput} />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleUserInput} />
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleUserInput} />
                    <label>Mobile</label>
                    <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleUserInput} />
                    <button onClick={this.postDataHandler} disabled={!this.state.isFormValid}>Show</button>
                </div>
            </Auxiliary >
        );
    }
}


export default CreatePost;