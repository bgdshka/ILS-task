import {
  CHANGE_ORDER_ADDRESS,
  NOT_RECEIVE_ORDERS,
  RECEIVE_ORDERS,
  REQUEST_ORDERS,
  SELECT_ORDER,
} from "../constants/actionTypes";

export default function orders(
  state = {
    orders: [],
    selectedOrder: null,
    isFetching: false,
    errors: null,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_ORDERS:
      return {
        ...state,
        isFetching: true,
      };

    case RECEIVE_ORDERS:
      return {
        ...state,
        orders: action.payload,
        isFetching: false,
      };

    case NOT_RECEIVE_ORDERS:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case SELECT_ORDER:
      return {
        ...state,
        selectedOrder: action.order,
      };

    case CHANGE_ORDER_ADDRESS:
      const newOrders = state.orders.map(order =>
        order.key === action.orderKey ? { ...order, [action.column]: action.coordinates } : order,
      );
      return {
        ...state,
        orders: newOrders,
        selectedOrder: newOrders.find(order => order.key === state.selectedOrder.key),
      };

    default:
      return state;
  }
}
