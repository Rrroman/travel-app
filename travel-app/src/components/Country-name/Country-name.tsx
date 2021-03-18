import React from 'react';
import { connect } from 'react-redux';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import * as actions from '../../actions/actions-country';
import styles from './country-name.module.css';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
};

type Props = CountriesStateType & MapDispatchToProps;

const CountryName: React.FC<Props> = ({
  countries,
  selectedCountryIndex,
  selectedLanguage,
  countriesLoaded,
}) => {
  const country = countries[selectedCountryIndex];

  return (
    <div className={styles['name-wrapper']}>
      <h3 className={styles['country-name']}>
        {countries.length > 0
          ? country.translations[selectedLanguage].name
          : null}
      </h3>
      <p className={styles['country-info']}>
        {countries.length > 0
          ? country.translations[selectedLanguage].info
          : null}
      </p>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(CountryName);
