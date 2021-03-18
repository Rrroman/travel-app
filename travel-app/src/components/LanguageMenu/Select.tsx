import React from 'react';
import styles from './language-menu.module.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions-country';
import { LanguageType } from '../../reducers/country-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LangSvg } from '../../assets/images/langSVG.svg';
import classes from './language-menu.module.css';

type MapDispatchToProps = {
  languageSelect: (value: LanguageType) => actions.languageSelectActionType;
};
type Props = RootStateType & MapDispatchToProps;

const LanguageMenu: React.FC<Props> = ({
  languageSelect,
  authStatusState,
  countryState,
}) => {
  const { mainIsOpen } = authStatusState;
  const { selectedLanguage } = countryState;
  const { i18n } = useTranslation();

  let color = mainIsOpen ? '#fff' : '#000';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    languageSelect(event.target.value as LanguageType);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <LangSvg fill={color} className={styles.lang__icon} />
      <label className={classes.label__wrapper}>
        <select
          defaultValue={selectedLanguage}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
            handleChange(event)
          }
        >
          <option value={LanguageType.en}>EN</option>
          <option value={LanguageType.ru}>RU</option>
          <option value={LanguageType.uk}>UK</option>
        </select>
      </label>
    </>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return state;
};

export default connect(mapStateToProps, actions)(LanguageMenu);
