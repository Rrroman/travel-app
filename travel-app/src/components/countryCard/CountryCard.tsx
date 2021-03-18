import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CountriesStateType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import * as actionsCountry from '../../actions/actions-country';
import * as actionsAuth from '../../actions/auth-actions';
import { routs } from '../App/App';
import { tabs } from '../pages/country-page/country-page';
import styles from './CountryCard.module.css';

type MapDispatchToProps = {
  countrySelect: (value: number) => actionsCountry.CountrySelectActionType;
  mainPageIsOpen: (value: boolean) => actionsAuth.AuthStatusChangeActionType;
};

type OwnProps = { index: number };

type Props = OwnProps & CountriesStateType & MapDispatchToProps;

const CountryCard: React.FC<Props> = ({
  index,
  countries,
  selectedLanguage,
  countrySelect,
  mainPageIsOpen,
}) => {
  const country = countries[index];
  const info = country.translations[selectedLanguage];
  const img = country.smallImg;

  const selectCountry = () => {
    mainPageIsOpen(false);
    countrySelect(index);
  };
  return (
    <Link to={`${routs.country}/${tabs.inspire}`}>
      <div
        className={styles['card-wrapper']}
        style={{ backgroundImage: `url('${img}')` }}
        onClick={selectCountry}
      >
        <div className={styles['country-name']}>{info.name}</div>
      </div>
    </Link>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};
const actions = { ...actionsAuth, ...actionsCountry };

export default connect(mapStateToProps, actions)(CountryCard);
