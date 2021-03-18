import React from 'react';
import { connect } from 'react-redux';
import { AuthStateType, AuthStatusNum } from '../../reducers/auth-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import * as actionsAuth from '../../actions/auth-actions';
import * as actionsUser from '../../actions/user-actions';
import styles from './profileCard.module.css';
import { useTranslation } from 'react-i18next';
import { AuthButton } from '../AuthButton/Auth-button';
import { UserStateType } from '../../reducers/user-reducer';
import ImageLoader from '../Image-loader/image-loader';

type MapDispatchToProps = {
  authStatusChange: (
    newStatus: AuthStatusNum,
  ) => actionsAuth.AuthStatusChangeActionType;
  userUpdate: (user: UserStateType) => actionsUser.UserActionType;
};

type Props = AuthStateType & UserStateType & MapDispatchToProps;

const ProfileCard: React.FC<Props> = ({
  userLogin,
  userEmail,
  authStatusChange,
  userUpdate,
}) => {
  const { t } = useTranslation();

  const logout = () => {
    authStatusChange(0);
    userUpdate({ userName: '', userLogin: '', userEmail: '' });
  };

  return (
    <div className={styles['profile-container']}>
      <div className={styles['profile-img-wrapper']}>
        <ImageLoader />
      </div>
      <div className={styles['user-login']}>{userLogin}</div>
      <div className={styles['profile-params']}>
        <p className={styles['user-params-label']}>
          {t('auth-page.profileCard.name')}
        </p>
        <input
          className={styles['user-params-input']}
          type="text"
          value={userLogin}
          onChange={() => null}
        />
      </div>
      <div className={styles['profile-params']}>
        <p className={styles['user-params-label']}>
          {t('auth-page.profileCard.email')}
        </p>
        <input
          className={styles['user-params-input']}
          type="text"
          value={userEmail}
          onChange={() => null}
        />
      </div>
      <div className={styles['button__wrapper']}>
        <AuthButton
          value={t('auth-page.auth-block.logout')}
          buttonClick={logout}
        />
      </div>
      <div className={styles['favorite-container']}>
        <p className={styles['user-params-label']}>
          {t('auth-page.profileCard.favorite')}
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootStateType) => {
  return { ...state.authStatusState, ...state.userState };
};

const actions = { ...actionsAuth, ...actionsUser };

export default connect(mapStateToProps, actions)(ProfileCard);
