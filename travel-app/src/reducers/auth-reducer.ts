import {
  AuthStatusChangeActionType,
  AUTH_ERROR_CHANGE,
  AUTH_STATUS_CHANGE,
  EMAIL_INPUT_CHANGE,
  LOGIN_INPUT_CHANGE,
  MAIN_PAGE_OPEN,
  PASSWORD_INPUT_CHANGE,
  SAVE_ERROR_MESSAGE,
} from '../actions/auth-actions';

export enum AuthStatusNum {
  signIn,
  logIn,
  auth,
}

export type ErrorMsgType = {
  en: string;
  ru: string;
  uk: string;
};

export type AuthStateType = {
  authStatus: AuthStatusNum;
  mainIsOpen: boolean;
  inputLogin: string;
  inputEmail: string;
  inputPassword: string;
  isError: boolean;
  error: ErrorMsgType;
};

const initialState: AuthStateType = {
  authStatus: 0,
  mainIsOpen: false,
  inputLogin: '',
  inputEmail: '',
  inputPassword: '',
  isError: false,
  error: {
    en: '',
    ru: '',
    uk: '',
  },
};

const authReducer = (
  state = initialState,
  action: AuthStatusChangeActionType,
) => {
  switch (action.type) {
    case AUTH_STATUS_CHANGE:
      return { ...state, authStatus: action.payload };
    case MAIN_PAGE_OPEN:
      return { ...state, mainIsOpen: action.payload };
    case LOGIN_INPUT_CHANGE:
      return { ...state, inputLogin: action.payload };
    case EMAIL_INPUT_CHANGE:
      return { ...state, inputEmail: action.payload };
    case PASSWORD_INPUT_CHANGE:
      return { ...state, inputPassword: action.payload };
    case AUTH_ERROR_CHANGE:
      return { ...state, isError: action.payload };
    case SAVE_ERROR_MESSAGE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export { authReducer };
