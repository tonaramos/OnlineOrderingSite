import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', orderData)
    .then((response) => {
      console.log('at axios success response.data-> ', response.data);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((error) => {
      dispatch(purchaseBurgerFail(error));
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDER_SUCCESS,
  orders,
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  axios.get('/orders.json')
    .then((res) => {
      fetchOrderStart();
      const fetchedOrders = [];
      Object.keys(res.data).map((key) => {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
        console.log('at axios success o action.orders-> ', fetchedOrders);
        return true;
      });
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      dispatch(fetchOrdersFail(err));
    });
};
