import React, { useEffect } from 'react';
import { RootStateType } from '../../../reducers/root-reducer';
import CountriesList from '../../CountriesList/CountriesList';
import CountryName from '../../Country-name/Country-name';
import styles from './main-page.module.css';
import * as actions from '../../../actions/auth-actions';
import { AuthStateType } from '../../../reducers/auth-reducer';
import { connect } from 'react-redux';
import SearchCountry from '../../SearchCountry/Search-country';

type MapDispatchToProps = {
  mainPageIsOpen: (value: boolean) => actions.AuthStatusChangeActionType;
};
type Props = MapDispatchToProps & AuthStateType;

const MainPage: React.FC<Props> = ({ mainPageIsOpen }) => {
  useEffect(() => {
    mainPageIsOpen(true);
  }, [mainPageIsOpen]);

  return (
    <div className={styles['main-page-container']}>
      <CountryName />
      <SearchCountry />
      <CountriesList />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.authStatusState;
};

export default connect(mapStateToProps, actions)(MainPage);
