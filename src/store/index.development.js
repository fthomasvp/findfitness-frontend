import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import reducers from './ducks';
import sagas from './sagas';
import Reactotron from '../config/ReactotronConfig';

const persistConfig = {
  key: 'findfitness',
  storage: session,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];

const composer = compose(
  applyMiddleware(...middlewares),
  Reactotron.createEnhancer()
);

let store = createStore(persistedReducer, composer);
let persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
