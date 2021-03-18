import React, { useState, useEffect } from 'react';
import ReactMapboxGL, {
  Marker,
  FullscreenControl,
  Layer,
  Source,
} from '@urbica/react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './MapComponent.module.css';
import { connect } from 'react-redux';
import CountriesService from '../../services/countries-service';
import * as actions from '../../actions/actions-country';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
};
type Props = MapDispatchToProps & CountriesStateType;

const MapComponent: React.FC<Props> = ({
  countriesLoaded,
  selectedCountryIndex,
  countries,
  selectedLanguage,
}) => {
  let latitudeCapital = 0;
  let longitudeCapital = 0;
  let polygon = {};
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoiZ2VuZXJhbC1tIiwiYSI6ImNraWozZjdrdjJkbWYycnBlNmw5N3RhNjgifQ.awd7EvjA7RM8Dl4Xb_5dBA';

  if (countries.length > 0) {
    latitudeCapital = countries[selectedCountryIndex].coordinate.latitude;
    longitudeCapital = countries[selectedCountryIndex].coordinate.longitude;
    polygon = countries[selectedCountryIndex].poligon;
  }

  useEffect(() => {
    const countryService = new CountriesService();
    countryService.getAllCountry().then((countries) => {
      countriesLoaded(countries.data);
    });
  }, [countriesLoaded]);

  const [viewport, setViewport] = useState({
    latitude: latitudeCapital,
    longitude: longitudeCapital,
    zoom: 3,
  });

  return (
    <div className={classes.map__wrapper}>
      <ReactMapboxGL
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
        mapStyle="mapbox://styles/general-m/ckmbenfqo4bxi17qivmeeyxo9"
        accessToken={MAPBOX_ACCESS_TOKEN}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={setViewport}
      >
        <Marker latitude={latitudeCapital} longitude={longitudeCapital}>
          <div className={classes.marker}></div>
        </Marker>
        <FullscreenControl position="top-right" />

        <Source
          id={selectedCountryIndex.toString()}
          type="geojson"
          data={polygon}
        >
          <Layer
            id="anything"
            type="fill"
            paint={{
              'fill-color': '#f4cb67',
              'fill-opacity': 0.6,
            }}
            source={selectedCountryIndex.toString()}
          />
        </Source>
      </ReactMapboxGL>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(MapComponent);
