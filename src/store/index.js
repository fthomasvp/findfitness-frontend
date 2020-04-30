import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import reducers from './ducks';
import sagas from './sagas';

const persistConfig = {
  key: 'findfitness',
  storage: session,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composer = applyMiddleware(...middlewares);

let store = createStore(persistedReducer, composer);
let persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
