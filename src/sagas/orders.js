import { takeEvery, put, call, fork, select } from "redux-saga/effects";
import Api from "../api/api";
import * as types from "../constants/actionTypes";

function apiCallToFetchOrders() {
  return Promise.resolve("OK");
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
