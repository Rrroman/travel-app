import React, { useEffect } from 'react';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducers/root-reducer';
import CountriesService from '../../services/countries-service';
import { Countries, CountriesStateType } from '../../reducers/country-reducer';
import * as actions from '../../actions/actions-country';
import { UserStateType } from '../../reducers/user-reducer';
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import styles from './rating.module.css';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

type MapDispatchToProps = {
  countriesLoaded: (
    value: Array<Countries>,
  ) => actions.CountriesLoadedActionType;
  countrySelect: (value: number) => actions.CountrySelectActionType;
};
type Props = MapDispatchToProps & CountriesStateType & UserStateType;

const StarsRating: React.FC<Props> = ({
  countries,
  selectedCountryIndex,
  selectedPlace,
  userLogin,
  countriesLoaded,
}) => {
  const { t } = useTranslation();
  const ratingChanged = (newRating: number) => {
    if (userLogin !== '') {
      const ratingData = {
        countryId: countries[selectedCountryIndex]._id,
        placeIndex: selectedPlace.toString(),
        newRating,
        userLogin,
      };
      const countryService = new CountriesService();
      countryService.updateRating(ratingData).then((data) => {
        countryService.getAllCountry().then((countries) => {
          countriesLoaded(countries.data);
        });
      });
    }
  };

  const countRate = () => {
    const currentPlace = countries[selectedCountryIndex].places[selectedPlace];
    const ratingLength = currentPlace.rating.length;
    const sumRating = currentPlace.rating.reduce((sum, item) => {
      return (sum += Number(item.score));
    }, 0);
    const rating = ratingLength ? sumRating / ratingLength : 0;
    return rating;
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      popover: {
        pointerEvents: 'none',
      },
      paper: {
        padding: theme.spacing(1),
        backgroundColor: 'rgba(60, 205, 215, 1)',
      },
    }),
  );

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openAlert, setOpen] = React.useState(false);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const ratingClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (userLogin === '') {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (userLogin !== '') {
      setOpen(false);
    }
  }, [userLogin]);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderRating = () => {
    return (
      <div className={styles.rating}>
        {countries[selectedCountryIndex].places[selectedPlace].rating.map(
          (elem, index) => {
            if (index < 10) {
              return (
                <div className={styles.rating__lines}>
                  <div className={styles.rating__name}>{elem.author}</div>
                  <div className={styles.rating__scores}>
                    <ReactStars value={elem.score} edit={false} />
                  </div>
                </div>
              );
            }
            return null;
          },
        )}
      </div>
    );
  };

  return (
    <>
      <div>
        <Collapse in={openAlert}>
          <Alert
            className={styles['alert-info']}
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="medium"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {t('country-page.rating.clickInfo')}
          </Alert>
        </Collapse>
      </div>
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={ratingClick}
      >
        {countries.length > 0 ? (
          <ReactStars
            className={styles.stars__rating}
            count={5}
            size={30}
            value={countRate()}
            onChange={ratingChanged}
            edit={true}
            color2={'#ffd700'}
          />
        ) : null}

        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          {renderRating()}
        </Popover>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return { ...state.countryState, ...state.userState };
};

export default connect(mapStateToProps, actions)(StarsRating);
