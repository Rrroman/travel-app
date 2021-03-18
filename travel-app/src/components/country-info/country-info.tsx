import React from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducers/root-reducer';
import * as actions from '../../actions/actions-country';
import classes from './country-info.module.css';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import { useTranslation } from 'react-i18next';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
};
type Props = MapDispatchToProps & CountriesStateType;

const CountryInfo: React.FC<Props> = ({
  countries,
  selectedCountryIndex,
  selectedLanguage,
}) => {
  const { t } = useTranslation();
  return (
    <div className={classes['card-info-wrapper']}>
      <div className={classes['card-info-about']}>
        <h3 className={classes.card__title}>
          {}
          {countries[selectedCountryIndex]
            ? countries[selectedCountryIndex].translations[selectedLanguage]
                .name
            : 'No Country'}
        </h3>
        <div className={classes.about}>
          {countries[selectedCountryIndex]
            ? countries[selectedCountryIndex].translations[selectedLanguage]
                .info
            : ''}
        </div>
      </div>
      <div className={classes['card-info-sidebar']}>
        <img
          src={
            countries[selectedCountryIndex]
              ? countries[selectedCountryIndex].flagUrl
              : ''
          }
          alt="country-flag"
          className={classes.flag}
        />
        <div className={classes['country-key-facts']}>
          <div className={classes.title}>Key facts:</div>
          <div className={classes.area}>
            <div className={classes.area__first}>{t('country-page.key-facts.area')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .area
                : ''}
            </div>
          </div>
          <div className={classes.population}>
            <div className={classes.population__first}>{t('country-page.key-facts.population')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .population
                : ''}
            </div>
          </div>
          <div className={classes['population-density']}>
            <div className={classes.pop_den}>{t('country-page.key-facts.pop-density')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .populationDensity
                : ''}
            </div>
          </div>
          <div className={classes.capital}>
            <div className={classes.capital__first}>{t('country-page.key-facts.capital')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .capital
                : ''}
            </div>
          </div>
          <div className={classes.government}>
            <div className={classes.gov__first}>{t('country-page.key-facts.government')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .government
                : ''}
            </div>
          </div>
          <div className={classes['head-of-state']}>
            <div className={classes.head}>{t('country-page.key-facts.headOfState')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .headOfState
                : ''}
            </div>
          </div>
          <div className={classes['head-of-government']}>
            <div className={classes.head__gov}>{t('country-page.key-facts.headOfGov')}:</div>
            <div>
              {countries[selectedCountryIndex]
                ? countries[selectedCountryIndex].translations[selectedLanguage]
                    .headOfGovernment
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(CountryInfo);
