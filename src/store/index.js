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
  whitelist: ['auth', 'studentGroup'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];

const composer =
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
    : applyMiddleware(...middlewares);

let store = createStore(persistedReducer, composer);
let persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
