import { createStore } from 'redux';
import rootReducer from './reducers/root-reducer';

const store = createStore(
  rootReducer,
  localStorage['redux-store']
    ? JSON.parse(localStorage['redux-store'])
    : undefined,
);

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
});
export default store;
