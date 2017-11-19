import { createStore, compose } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

const data = {};

// create an object for the default data
const defaultState = {
  data
};

const store = createStore(rootReducer, defaultState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot){
  module.hot.accept('./reducers/',()=>{
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  })
}
export default store;
