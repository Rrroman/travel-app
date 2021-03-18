import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions-country';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import ImageGallery from 'react-image-gallery';
import classes from './country-gallery.module.css';
import StarsRating from '../rating/rating';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
  changeSelectPlaces: (value: number) => actions.SelectPlacesActionType;
};
type Props = MapDispatchToProps & CountriesStateType;

const CountryGallery: React.FC<Props> = ({
  countries,
  selectedCountryIndex,
  selectedLanguage,
  selectedPlace,
  changeSelectPlaces,
}) => {
  const renderImages = () => {
    return countries[selectedCountryIndex].places.map((place) => {
      return {
        original: place.imgUrl,
        thumbnail: place.imgSmallUrl,
        originalTitle: place.translations[selectedLanguage].name,
      };
    });
  };

  const [title, setTitle] = useState(
    countries[selectedCountryIndex].places[0].translations[selectedLanguage]
      .name,
  );
  const [description, setDescription] = useState(
    countries[selectedCountryIndex].places[0].translations[selectedLanguage]
      .info,
  );

  useEffect(() => {
    renderSidebar(selectedPlace);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  const renderSidebar = (index: number) => {
    changeSelectPlaces(index);
    return (
      setTitle(
        countries[selectedCountryIndex].places[index].translations[
          selectedLanguage
        ].name,
      ),
      setDescription(
        countries[selectedCountryIndex].places[index].translations[
          selectedLanguage
        ].info,
      )
    );
  };

  return (
    <div className={classes.gallery__wrapper}>
      <div className={classes.gallery__top}>
        <div className={classes.gallery__mainscreen}>
          <ImageGallery
            showBullets={true}
            items={renderImages()}
            onSlide={renderSidebar}
          />
        </div>{' '}
        <div className={classes.gallery__sidebar}>
          <div className={classes.description}>
            <h2>{title}</h2>
            <div className={classes.descript}>{description}</div>
          </div>
          <StarsRating/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(CountryGallery);
