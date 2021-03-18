import { UserStateType } from '../reducers/user-reducer';

const USER_UPDATE = 'USER_UPDATE';
const USER_FOTO_ADD = 'USER_FOTO_ADD';

const userUpdate = (user: UserStateType) => {
  return {
    type: USER_UPDATE,
    payload: user,
  };
};

const userFotoAd = (file: string) => {
  return {
    type: USER_FOTO_ADD,
    payload: file,
  };
};

export type UserActionType = {
  type: string;
  payload: UserStateType | string;
};

export { userUpdate, userFotoAd, USER_UPDATE, USER_FOTO_ADD };
