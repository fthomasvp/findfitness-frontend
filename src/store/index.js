import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./ducks";
import sagas from "./sagas";

import Reactotron from "../config/ReactotronConfig";

const sagaMonitor = Reactotron.createSagaMonitor()

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];

const composer =
  process.env.NODE_ENV === "development"
    ? compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
    : applyMiddleware(...middlewares);

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
