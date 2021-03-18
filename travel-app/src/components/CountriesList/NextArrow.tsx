import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions-country';
import { CountriesStateType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';

type MapDispatchToProps = {
  countrySelect: (value: number) => actions.CountrySelectActionType;
};

type OwnProps = any;

type Props = MapDispatchToProps & CountriesStateType & OwnProps;

const NextArrow: React.FC<Props> = (props) => {
  const {
    className,
    onClick,
    countrySelect,
    selectedCountryIndex,
    countries,
  } = props;
  const nextClick = () => {
    const length = countries.length;
    let newIndex =
      selectedCountryIndex === length - 1 ? 0 : selectedCountryIndex + 1;
    countrySelect(newIndex);
    onClick();
  };
  return <div className={className} onClick={nextClick} />;
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(NextArrow);
