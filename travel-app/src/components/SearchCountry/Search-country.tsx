import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions-country';
import { RootStateType } from '../../reducers/root-reducer';
import styles from './search-country.module.css';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
  searchInputChange: (value: string) => actions.SearchChangeActionType;
};

type Props = MapDispatchToProps & CountriesStateType;

const SearchCountry: React.FC<Props> = ({
  countriesLoaded,
  countrySelect,
  searchInputChange,
  countries,
  selectedCountryIndex,
  selectedLanguage,
  searchText,
}) => {
  const searchInput = useRef(null);
  useEffect(() => {
    if (searchInput) {
      (searchInput.current! as HTMLInputElement).focus();
    }
  }, []);
  const { t } = useTranslation();

  const inputChange = (event: React.ChangeEvent<{ value: string }>) => {
    searchInputChange(event.target.value);
  };

  return (
    <div className={styles['search-country-wrapper']}>
      <form
        className={styles['search-form']}
        onSubmit={(event) => event.preventDefault()}
      >
        <SearchIcon
          style={{ fontSize: 20 }}
          className={styles['search-icons']}
        />
        <input
          className={styles['search-input']}
          type="text"
          placeholder={t('main-page.main-body.search')}
          value={searchText}
          onChange={inputChange}
          ref={searchInput}
        />
        <div onClick={() => searchInputChange('')}>
          <CloseIcon
            style={{ fontSize: 20 }}
            className={styles['search-icons']}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state.countryState;
};

export default connect(mapStateToProps, actions)(SearchCountry);
