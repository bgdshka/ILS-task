import * as types from '../constants/ActionTypes';

export function getOrders() {
  return {
    type: types.REQUEST_ORDERS,
  };
}
