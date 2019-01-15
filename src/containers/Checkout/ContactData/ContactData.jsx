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
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
          },
          value: '',
        },
        state: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'State',
          },
          value: '',
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
          },
          value: '',
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail',
          },
          value: '',
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
        },
      },
      loading: false,
    };
    this.orderHandler = this.orderHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  orderHandler(event) {
    event.preventDefault(); // this prevents sending a request and reloading the form/page
    const { ingredients, price, history } = this.props;
    console.log(this.props);
    this.setState({ loading: true });
    // const { ingredients, totalPrice } = this.state;
    const order = {
      ingredients,
      price,
      customer: {
        name: 'Tona',
        address: {
          street: '100 Test St',
          state: 'California',
          zipCode: '10101',
          country: 'United States',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
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
    console.log('event target', event.target.value);
    // console.log('the order form', orderForm);
    return orderForm;
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
    console.log('form elements array----->>>>.', formElementsArray);
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            inputtype={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={() => this.inputChangeHandler()}
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
