// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers/rootReducer';
// export default function configureStore() {
//  return createStore(
//   rootReducer,
//    applyMiddleware(thunk)
//  );
// }

// import { applyMiddleware, createStore } from "redux";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import promiseMiddleware from "redux-promise-middleware";
// import rootReducer from './reducers/rootReducer';

// // const middleware = applyMiddleware(promiseMiddleware(), thunk);
// const middleware = applyMiddleware(promiseMiddleware(), thunk, logger);

// export default function configureStore() {
//   return createStore(rootReducer, middleware);
// }
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

import rootReducer from './reducers/rootReducer';

// const middleware = applyMiddleware(promiseMiddleware(), thunk);
const middleware = applyMiddleware(promiseMiddleware(), thunk, logger);

export default createStore(rootReducer,
    middleware);