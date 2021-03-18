import React from 'react';
import { connect } from 'react-redux';

import { AuthStateType, AuthStatusNum } from '../../../reducers/auth-reducer';
import { RootStateType } from '../../../reducers/root-reducer';
import * as actions from '../../../actions/auth-actions';
import AuthBlock from '../../Auth-block/Auth-block';
import VideoStart from '../../Video-start/Video-start';
import styles from './auth-page.module.css';
import ProfileCard from '../../profile-card/ProfileCard';

type MapDispatchToProps = {
  authStatusChange: (
    newStatus: AuthStatusNum,
  ) => actions.AuthStatusChangeActionType;
};

type Props = AuthStateType & MapDispatchToProps;

const AuthPage: React.FC<Props> = ({ authStatus, authStatusChange }) => {
  return (
    <div className={styles['auth-page-wrapper']}>
      <div className={styles['block-container left-block']}>
        <VideoStart />
      </div>
      <div className={styles['block-container right-block']}>
        <div className={styles['auth-container']}>
          {authStatus === 2 ? <ProfileCard /> : <AuthBlock />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => state.authStatusState;

export default connect(mapStateToProps, actions)(AuthPage);
