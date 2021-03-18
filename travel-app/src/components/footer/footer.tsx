import React from 'react';
import classes from './footer.module.css';
import * as actions from '../../actions/auth-actions';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducers/root-reducer';
import { AuthStateType } from '../../reducers/auth-reducer';

type MapDispatchToProps = {
  mainPageIsOpen: (value: boolean) => actions.AuthStatusChangeActionType;
};
type Props = MapDispatchToProps & AuthStateType;

const Footer: React.FC<Props> = ({ mainIsOpen }) => {
  const linkBlack = mainIsOpen
    ? classes.footer__link_white
    : classes.footer__link_black;

  return (
    <footer className={`${classes.footer} ${linkBlack}`}>
      <a href="https://github.com/juliememe" className={classes.footer__link}>
        Juliememe
      </a>
      <a href="https://github.com/gaziz666" className={classes.footer__link}>
        Gaziz666
      </a>
      <a href="https://github.com/general-m" className={classes.footer__link}>
        General-m
      </a>
      <a href="https://github.com/rrroman" className={classes.footer__link}>
        Rrroman
      </a>
      <a
        href="https://rs.school/js/"
        className={`${classes.footer__link} ${classes['footer__rs-logo']}`}
      >
        Rs School
      </a>


    </footer>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.authStatusState;
};

export default connect(mapStateToProps, actions)(Footer);
