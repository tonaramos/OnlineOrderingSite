import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
    };
  }

  componentDidMount() {
    // axios.get('/orders.json')
    //   .then((res) => {
    //     const fetchedOrders = [];
    //     console.log(res.data);
    //     Object.keys(res.data).map((key) => {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //       console.log(fetchedOrders);
    //       return true;
    //     });
    //     this.setState({ loading: false });
    //     this.setState({ orders: fetchedOrders });
    //     // return true;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    const { loading, orders } = this.state;
    console.log(loading, orders[0]);
    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
