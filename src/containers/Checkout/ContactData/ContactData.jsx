import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        state: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'State',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
          },
          valid: false,
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapest', displayValue: 'Cheapest' },
            ],
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
      },
      loading: false,
    };
    this.orderHandler = this.orderHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  orderHandler(event) {
    event.preventDefault(); // this prevents sending a request and reloading the form/page
    const { ingredients, price, history } = this.props;
    const { orderForm } = this.state;
    this.setState({ loading: true });
    const formData = {}; // this is a list with a list of properties from the state
    Object.keys(orderForm).map((formElementIdentifier) => {
      formData[formElementIdentifier] = orderForm[formElementIdentifier];
      return true;
    });

    const order = {
      ingredients,
      price,
      orderData: formData,
    };
    axios.post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
        });
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }

  inputChangeHandler(event, inputIdentifier) {
    const { orderForm } = this.state;
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log('UpdatedFormElement->> ', updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
    return orderForm;
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

  render() {
    const {
      orderForm, loading, // purchasing,
    } = this.state;

    const formElementsArray = [];
    const orderFormKeys = Object.keys(orderForm);

    orderFormKeys.map(key => formElementsArray.push({
      id: key,
      config: orderForm[key],
    }));
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            inputType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          {'ORDER'}
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>
          {'Enter your Contact Data'}
        </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
