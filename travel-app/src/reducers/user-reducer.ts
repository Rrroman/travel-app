import {
  UserActionType,
  USER_UPDATE,
  USER_FOTO_ADD,
} from '../actions/user-actions';
export type UserStateType = {
  userName: string;
  userLogin: string;
  userEmail: string;
  file?: string;
};

const initialState: UserStateType = {
  userName: '',
  userLogin: '',
  userEmail: '',
  file: '',
};

const userReducer = (state = initialState, action: UserActionType) => {
  switch (action.type) {
    case USER_UPDATE:
      return action.payload;
    case USER_FOTO_ADD:
      return { ...state, file: action.payload };
    default:
      return state;
  }
};

export { userReducer };
