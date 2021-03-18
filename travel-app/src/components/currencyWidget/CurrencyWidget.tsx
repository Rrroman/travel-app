import React, { useState, useEffect } from 'react';
import classes from './CurrencyWidget.module.css';
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

const CurrencyWidget: React.FC<Props> = ({
    countriesLoaded,
    selectedCountryIndex,
    countries,
    selectedLanguage,
}) => {
    const CURRENCY_EXCHANGE = ['USD', 'EUR', 'RUB'];
    let currencyBase = '';
    let rate = '';
    const [outputCurrency, setOutputCurrency] = useState(['']);
    if (countries.length > 0) {
        currencyBase =
            countries[selectedCountryIndex].translations[selectedLanguage].currency;
        rate = countries[selectedCountryIndex].rate;
    }

    useEffect(() => {
        const CURRENCY_API = `https://api.exchangeratesapi.io/latest?base=${rate}`;
        let cleanupFunction = false;
        const request = async () => {
            try {
                const response = await fetch(CURRENCY_API);
                const data = await response.json();

                CURRENCY_EXCHANGE.map((rate) => {
                    Object.entries(data.rates).map(([key, value]) => {
                        if (key === rate) {
                            if (!cleanupFunction) {
                                setOutputCurrency((outputCurrency) => [
                                    ...outputCurrency,
                                    `${key}: ${(value as number).toFixed(2)}`,
                                ]);
                            }
                        }
                        return null;
                    });
                    return null;
                });
            } catch (e) {
                console.error(e.message);
            }

            return () => (cleanupFunction = true);
        };

        request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ouputC = () => {
        return outputCurrency.map((item, index) => <div key={index}>{item}</div>);
    };

    return (
        <div className={classes.widget}>
            <div>{currencyBase}</div>
            {ouputC()}
        </div>
    );
};

const mapStateToProps = (state: RootStateType) => {
    return state.countryState;
};

export default connect(mapStateToProps, actions)(CurrencyWidget);
