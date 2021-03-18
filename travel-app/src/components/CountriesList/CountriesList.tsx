import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../actions/actions-country';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import CountryCard from '../countryCard/CountryCard';
import { RootStateType } from '../../reducers/root-reducer';
import styles from './CountriesList.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routs } from '../App/App';
import { tabs } from '../pages/country-page/country-page';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
};
type Props = MapDispatchToProps & CountriesStateType;

let settings = {
  dots: false,
  initialSlide: 0,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 5000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        initialSlide: 0,
      },
    },
  ],
};

const settingsChange = (length: number) => {
  if (length === 2) {
    settings.responsive[0].settings.slidesToShow = 2;
    settings.responsive[1].settings.slidesToShow = 2;
    settings.responsive[2].settings.slidesToShow = 1;
  } else if (length === 1) {
    settings.responsive[0].settings.slidesToShow = 1;
    settings.responsive[1].settings.slidesToShow = 1;
    settings.responsive[2].settings.slidesToShow = 1;
  } else if (length > 2) {
    settings.responsive[0].settings.slidesToShow = 3;
    settings.responsive[1].settings.slidesToShow = 2;
    settings.responsive[2].settings.slidesToShow = 1;
  }
};

const CountriesList: React.FC<Props> = ({
  countriesLoaded,
  countries,
  searchText,
  selectedLanguage,
}) => {
  const { t } = useTranslation();

  const renderCard = () => {
    const cardArray = countries
      .filter((country) => {
        const name = country.translations[selectedLanguage].name.toLowerCase();
        const capital = country.translations[
          selectedLanguage
        ].capital.toLowerCase();
        if (
          name.includes(searchText.toLowerCase()) ||
          capital.includes(searchText.toLowerCase())
        ) {
          return country;
        }
        return false;
      })
      .map((country) => {
        return <CountryCard index={country.index} key={country._id} />;
      });
    settingsChange(cardArray.length);
    return cardArray;
  };

  return (
    <div className={styles['country-list-wrapper']}>
      <div className={styles['explore-button']}>
        <Link to={`${routs.country}/${tabs.inspire}`}>
          {t('main-page.main-body.explore')}
        </Link>
      </div>
      <div className={styles['country-list']}>
        <Slider {...settings}>{renderCard()}</Slider>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(CountriesList);
