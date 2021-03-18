import { AuthStatusNum, ErrorMsgType } from '../reducers/auth-reducer';

const AUTH_STATUS_CHANGE = 'AUTH_STATUS_CHANGE';
const MAIN_PAGE_OPEN = 'MAIN_PAGE_OPEN';
const LOGIN_INPUT_CHANGE = 'LOGIN_INPUT_CHANGE';
const EMAIL_INPUT_CHANGE = 'EMAIL_INPUT_CHANGE';
const PASSWORD_INPUT_CHANGE = 'PASSWORD_INPUT_CHANGE';
const AUTH_ERROR_CHANGE = 'AUTH_ERROR_CHANGE';
const SAVE_ERROR_MESSAGE = 'SAVE_ERROR_MESSAGE';

const authStatusChange = (newStatus: AuthStatusNum) => {
  return {
    type: AUTH_STATUS_CHANGE,
    payload: newStatus,
  };
};

const mainPageIsOpen = (value: boolean) => {
  return {
    type: MAIN_PAGE_OPEN,
    payload: value,
  };
};

const loginInputChange = (value: string) => {
  return {
    type: LOGIN_INPUT_CHANGE,
    payload: value,
  };
};

const emailInputChange = (value: string) => {
  return {
    type: EMAIL_INPUT_CHANGE,
    payload: value,
  };
};

const passwordInputChange = (value: string) => {
  return {
    type: PASSWORD_INPUT_CHANGE,
    payload: value,
  };
};

const authErrorStatusChange = (value: boolean) => {
  return {
    type: AUTH_ERROR_CHANGE,
    payload: value,
  };
};

const saveErrorMessage = (value: ErrorMsgType) => {
  return {
    type: SAVE_ERROR_MESSAGE,
    payload: value,
  };
};

export type AuthStatusChangeActionType = {
  type: string;
  payload: AuthStatusNum | boolean;
};

export type AuthInputChangeActionType = {
  type: string;
  payload: string;
};

export type ErrorMsgSaveActionType = {
  type: string;
  payload: ErrorMsgType;
};

export {
  authStatusChange,
  mainPageIsOpen,
  loginInputChange,
  emailInputChange,
  passwordInputChange,
  authErrorStatusChange,
  saveErrorMessage,
  AUTH_STATUS_CHANGE,
  MAIN_PAGE_OPEN,
  LOGIN_INPUT_CHANGE,
  EMAIL_INPUT_CHANGE,
  PASSWORD_INPUT_CHANGE,
  AUTH_ERROR_CHANGE,
  SAVE_ERROR_MESSAGE,
};
