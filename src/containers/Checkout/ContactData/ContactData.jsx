import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      loading: false,
    };
    this.orderHandler = this.orderHandler.bind(this);
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

  render() {
    const {
      name, email, address, loading, purchasing,
    } = this.state;
    console.log(name, email, address, purchasing);
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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
