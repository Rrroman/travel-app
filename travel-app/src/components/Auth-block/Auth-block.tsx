import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  AuthStateType,
  AuthStatusNum,
  ErrorMsgType,
} from '../../reducers/auth-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import * as authActions from '../../actions/auth-actions';
import * as userActions from '../../actions/user-actions';
import styles from './auth-block.module.css';
import { AuthButton } from '../AuthButton/Auth-button';
import { useTranslation } from 'react-i18next';
import AuthService from '../../services/auth-service';
import { UserStateType } from '../../reducers/user-reducer';
import { CountriesStateType } from '../../reducers/country-reducer';

type MapDispatchToProps = {
  authStatusChange: (
    newStatus: AuthStatusNum,
  ) => authActions.AuthStatusChangeActionType;
  loginInputChange: (value: string) => authActions.AuthInputChangeActionType;
  emailInputChange: (value: string) => authActions.AuthInputChangeActionType;
  passwordInputChange: (value: string) => authActions.AuthInputChangeActionType;
  authErrorStatusChange: (
    value: boolean,
  ) => authActions.AuthStatusChangeActionType;
  userUpdate: (user: UserStateType) => userActions.UserActionType;
  saveErrorMessage: (value: ErrorMsgType) => authActions.ErrorMsgSaveActionType;
};

type Props = AuthStateType &
  MapDispatchToProps &
  CountriesStateType &
  UserStateType;

const AuthBlock: React.FC<Props> = ({
  authStatus,
  inputLogin,
  inputEmail,
  inputPassword,
  isError,
  error,
  selectedLanguage,
  userLogin,
  authStatusChange,
  loginInputChange,
  emailInputChange,
  passwordInputChange,
  authErrorStatusChange,
  userUpdate,
  saveErrorMessage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const header =
    authStatus === 0
      ? t('auth-page.auth-block.sign-in')
      : t('auth-page.auth-block.log-in');

  const userParamSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const authService = new AuthService();
    if (authStatus === 1) {
      authService
        .createNewUser({
          login: inputLogin,
          email: inputEmail,
          password: inputPassword,
        })
        .then((data) => {
          if (data.error !== null) {
            authErrorStatusChange(true);
            saveErrorMessage(data.error);
          } else {
            authErrorStatusChange(false);
            userUpdate(data.data);
            authStatusChange(2);
            history.goBack();
          }
        });
    } else if (authStatus === 0) {
      authService
        .loginApp({ login: inputLogin, password: inputPassword })
        .then((data) => {
          if (data.error !== null) {
            authErrorStatusChange(true);
            saveErrorMessage(data.error);
          } else {
            authErrorStatusChange(false);
            userUpdate(data.data);
            authStatusChange(2);
            history.goBack();
          }
        });
    }
  };

  return (
    <>
      <div className={styles['auth-header']}>{header}</div>
      <form className={styles['auth-form']} onSubmit={userParamSubmit}>
        {isError ? (
          <p className={styles['error-label']}>{error[selectedLanguage]}</p>
        ) : null}

        <p className={styles['auth-label']}>
          {t('auth-page.auth-block.name')}*
        </p>
        <input
          className={styles['auth-input']}
          type="text"
          name="name"
          value={inputLogin}
          onChange={(event) => loginInputChange(event.target.value)}
        />
        {authStatus === 1 ? (
          <>
            <p className={styles['auth-label']}>
              {t('auth-page.auth-block.email')}*
            </p>
            <input
              className={styles['auth-input']}
              type="email"
              name="email"
              value={inputEmail}
              onChange={(event) => emailInputChange(event.target.value)}
            />
          </>
        ) : null}
        <p className={styles['auth-label']}>
          {t('auth-page.auth-block.password')}*
        </p>
        <input
          className={styles['auth-input']}
          type="text"
          name="password"
          value={inputPassword}
          onChange={(event) => passwordInputChange(event.target.value)}
        />
        {authStatus === 0 ? (
          <>
            <div className={styles['button__wrapper']}>
              <AuthButton value={t('auth-page.auth-block.sign-in')} />
            </div>
            <div className={styles['skip-button']}>
              <Link to="/main">{t('auth-page.auth-block.skip')}</Link>
            </div>
          </>
        ) : (
          <div className={styles['button__wrapper']}>
            <AuthButton value={t('auth-page.auth-block.log-in')} />
          </div>
        )}
      </form>
      {authStatus === 0 ? (
        <div
          className={styles['change-login__text']}
          onClick={() => authStatusChange(1)}
        >
          {t('auth-page.auth-block.sign-up-text')}
        </div>
      ) : (
        <div
          className={styles['change-login__text']}
          onClick={() => authStatusChange(0)}
        >
          {t('auth-page.auth-block.sign-in-text')}
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state: RootStateType) => {
  return {
    ...state.authStatusState,
    ...state.userState,
    ...state.countryState,
    ...state.userState,
  };
};

const actions = { ...userActions, ...authActions };

export default connect(mapStateToProps, actions)(AuthBlock);
