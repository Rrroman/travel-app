import {
  COUNTRIES_LOAD,
  COUNTRY_SELECT,
  LANGUAGE_SELECT,
  SEARCH_CHANGE,
  SELECT_PLACE,
} from '../actions/actions-country';

export type Countries = {
  _id: string;
  imgUrl: string;
  smallImg: string;
  flagUrl: string;
  videoUrl: string;
  prevImg: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  poligon: {
    id: string;
    type: string;
    properties: { [key: string]: string | number | null };
    coordinates: [[[[number]]]];
  };
  placesCount: number;
  rate: string;
  index: number;
  timeZone: string;
  places: [
    {
      imgUrl: string;
      imgSmallUrl: string;
      id: string;
      rating: [
        {
          score: number;
          author: string;
        },
      ];
      translations: {
        en: {
          name: string;
          info: string;
          favorite: boolean;
        };
        ru: {
          name: string;
          info: string;
          favorite: boolean;
        };
        uk: {
          name: string;
          info: string;
          favorite: boolean;
        };
      };
    },
  ];
  translations: {
    en: {
      name: string;
      info: string;
      about: string;
      area: string;
      population: string;
      populationDensity: string;
      capital: string;
      government: string;
      headOfState: string;
      headOfGovernment: string;
      currency: string;
      timeFormat: string;
    };
    ru: {
      name: string;
      info: string;
      about: string;
      area: string;
      population: string;
      populationDensity: string;
      capital: string;
      government: string;
      headOfState: string;
      headOfGovernment: string;
      currency: string;
      timeFormat: string;
    };
    uk: {
      name: string;
      info: string;
      about: string;
      area: string;
      population: string;
      populationDensity: string;
      capital: string;
      government: string;
      headOfState: string;
      headOfGovernment: string;
      currency: string;
      timeFormat: string;
    };
  };
};

export enum LanguageType {
  en = 'en',
  ru = 'ru',
  uk = 'uk',
}

export type CountriesStateType = {
  countries: Array<Countries>;
  selectedCountryIndex: number;
  selectedLanguage: LanguageType;
  searchText: string;
  selectedPlace: number;
};

const initialState: CountriesStateType = {
  countries: [],
  selectedCountryIndex: 0,
  selectedLanguage: LanguageType.en,
  searchText: '',
  selectedPlace: 0,
};

const countryReducer = (
  state = initialState,
  action: { type: string; payload: Array<Countries> | string },
) => {
  switch (action.type) {
    case COUNTRIES_LOAD:
      return {
        ...state,
        countries: action.payload,
      };
    case COUNTRY_SELECT:
      return {
        ...state,
        selectedCountryIndex: action.payload,
      };
    case LANGUAGE_SELECT:
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        searchText: action.payload,
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: action.payload,
      };
    default:
      return state;
  }
};

export { countryReducer };
