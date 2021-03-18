import React, { useState, useEffect } from 'react';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import classes from './time-widget.module.css';
import * as actions from '../../actions/actions-country';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducers/root-reducer';
import { useTranslation } from 'react-i18next';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
};
type Props = MapDispatchToProps & CountriesStateType;

const TimeWidget: React.FC<Props> = ({
  countries,
  selectedCountryIndex,
  selectedLanguage,
}) => {
  const [timeAndDate, setTimeAndDate] = useState(new Date());
  const { t } = useTranslation();

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return function cleanUp() {
      clearInterval(timerId);
    };
  });

  const tick = () => setTimeAndDate(new Date());

  const options: Object = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: countries[selectedCountryIndex]
      ? countries[selectedCountryIndex].timeZone
      : '',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const locale = countries[selectedCountryIndex]
    ? countries[selectedCountryIndex].translations[selectedLanguage].timeFormat
    : '';

  return (
    <div className={classes.time__widget}>
      <div className={classes.time}>
        {countries[selectedCountryIndex]
          ? countries[selectedCountryIndex].translations[selectedLanguage]
              .capital
          : ''}
        , {t('country-page.times.localTime')}
      </div>
      <div className={classes.date}>
        {timeAndDate.toLocaleDateString(locale, options)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(TimeWidget);
