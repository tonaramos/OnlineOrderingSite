import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        authEmail: {
          elementType: 'inputAuthEmail',
          elementConfig: {
            type: 'email',
            placeholder: 'Email Address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        authPassword: {
          elementType: 'inputAuthPassword',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      },
    };
  }

  checkValidity(value, rules) {
    const { orderForm } = this.state;
    console.log(orderForm);
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.length) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangeHandler(event, controlName) {
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler(event) {
    const { controls } = this.state;
    const { onAuth } = this.props;
    event.preventDefault();
    onAuth(controls.email.value, controls.password);
  }

  render() {
    const {
      controls,
      // formIsValid,
    } = this.state;

    // const {
    //   // loading,
    // } = this.props;

    const formElementsArray = [];
    const orderFormKeys = Object.keys(controls);

    orderFormKeys.map(key => formElementsArray.push({
      id: key,
      config: controls[key],
    }));

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        inputType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        valueType={formElement.id}
        changed={event => this.inputChangeHandler(event, formElement.id)}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {'SUBMIT'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.auth(email, password)),
});

export default connect(null, mapDispatchToProps)(Auth);
