import React from 'react';
import { Player, BigPlayButton } from 'video-react';
import { RootStateType } from '../../reducers/root-reducer';
import * as actions from '../../actions/actions-country';
import classes from './inspire.module.css';
import { connect } from 'react-redux';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
};
type Props = CountriesStateType & MapDispatchToProps;

const Inspire: React.FC<Props> = ({ countries, selectedCountryIndex }) => {
  return (
    <div className={classes.player__wrapper}>
      <Player
        muted={true}
        autoPlay={true}
        playsInline
        poster={countries[selectedCountryIndex].prevImg}
        src={countries[selectedCountryIndex].videoUrl}
      >
        <BigPlayButton position="center" />
      </Player>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(Inspire);
