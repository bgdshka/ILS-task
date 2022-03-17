import * as types from '../constants/actionTypes';

export function getOrders() {
  return {
    type: types.REQUEST_ORDERS,
  };
}

export function selectOrder(order) {
  return {
    type: types.SELECT_ORDER,
    order
  };
}
