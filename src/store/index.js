import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import getSagas, { createDynamicSaga } from '../sagas';


const DEBUG = process.env.NODE_ENV !== 'production';

const sagaMiddleware = createSagaMiddleware();


export default function configureStore(initialState) {

  let composeEnhancers = compose;
  if (DEBUG) {
    composeEnhancers = composeWithDevTools;
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(createDynamicSaga('SET_SAGAS', getSagas()));

  return store;
}
