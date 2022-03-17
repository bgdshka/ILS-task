import { takeEvery, put, call } from "redux-saga/effects";
import * as types from "../constants/actionTypes";
import { ordersMock } from "../constants/mocks";

function apiCallToFetchOrders() {
  return Promise.resolve(ordersMock);
}

export function* getOrders(action) {
  try {
    const response = yield call(apiCallToFetchOrders);

    yield put({
      type: types.RECEIVE_ORDERS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: types.NOT_RECEIVE_ORDERS,
      error: error,
    });
  }
}

export default function* watchOrders() {
  yield takeEvery(types.REQUEST_ORDERS, getOrders);
}
