import { combineReducers } from 'redux';
import { authReducer, AuthStateType } from './auth-reducer';
import { CountriesStateType, countryReducer } from './country-reducer';
import { userReducer, UserStateType } from './user-reducer';

const rootReducer = combineReducers({
  countryState: countryReducer,
  authStatusState: authReducer,
  userState: userReducer,
});

export default rootReducer;

export type RootStateType = {
  countryState: CountriesStateType;
  authStatusState: AuthStateType;
  userState: UserStateType;
};
