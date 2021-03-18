import React, { useState, useEffect } from 'react';
import classes from './WeatherWidget.module.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions-country';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
};
type Props = MapDispatchToProps & CountriesStateType;

const WeatherWidget: React.FC<Props> = ({
  countriesLoaded,
  selectedCountryIndex,
  countries,
  selectedLanguage,
}) => {
  let countryCapital = '';

  if (countries.length > 0) {
    countryCapital =
      countries[selectedCountryIndex].translations[selectedLanguage].capital;
  }

  const [temperature, setTemperature] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');

  useEffect(() => {
    const countryCapitalEn =
      countries[selectedCountryIndex].translations.en.capital;
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${countryCapitalEn}&appid=630198738706e6feb41dd55034d68b96&units=imperial&lang=${selectedLanguage}`;
    const request = async () => {
      try {
        const response = await fetch(WEATHER_API);
        const data = await response.json();
        setWeatherIcon(
          `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        );
        setWeatherDescription(data.weather[0].description);
        setTemperature(Math.round(((data.main.temp - 32) * 5) / 9));
      } catch (e) {
        console.error(e.message);
      }
    };
    request();
  }, [countries, selectedCountryIndex, selectedLanguage]);

  return (
    <div className={classes.widget}>
      <div>{countryCapital}</div>
      <div>{temperature}°</div>
      <img src={weatherIcon} alt="cloud" />
      <div>{weatherDescription}</div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(WeatherWidget);
