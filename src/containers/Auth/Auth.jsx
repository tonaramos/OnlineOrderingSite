import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
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
      isSignup: true,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.switchAuthModeHandler = this.switchAuthModeHandler.bind(this);
  }

  componentDidMount() {
    const { building, authRedirectPath, onSetAuthRedirectPath } = this.props;
    console.log('building? ', building, ' authRedirectPath? ', authRedirectPath);
    if (!building && authRedirectPath !== '/') {
      console.log('about to call onSetAuthRedirectPath');
      onSetAuthRedirectPath();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkValidity(value, rules) {
    // const { controls } = this.state;
    // controls;
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
    const { controls, isSignup } = this.state;
    console.log('=====> ', controls);
    const { onAuth } = this.props;
    event.preventDefault();
    onAuth(controls.authEmail.value, controls.authPassword.value, isSignup);
  }

  switchAuthModeHandler() {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  }

  render() {
    const {
      controls,
      isSignup,
    } = this.state;

    const {
      loading,
      error,
      isAuthenticated,
      authRedirectPath,
    } = this.props;

    const formElementsArray = [];
    const orderFormKeys = Object.keys(controls);

    orderFormKeys.map(key => formElementsArray.push({
      id: key,
      config: controls[key],
    }));

    let form = formElementsArray.map(formElement => (
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

    if (loading) {
      form = <Spinner />;
    }

    let errorMassage = null;
    if (error) {
      errorMassage = (
        <p>
          {error.message}
        </p>
      );
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMassage}
        <form>
          {form}
          <Button btnType="Success" clicked={this.submitHandler}>
            {'SUBMIT'}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          { `SWITCH TO ${isSignup ? 'SIGNIN' : 'SIGNUP'}`}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  building: state.builder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
