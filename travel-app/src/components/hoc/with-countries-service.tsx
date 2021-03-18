import React from 'react';
import { CountriesServiceConsumer } from '../countries-service-context/countries-service-context';

const withCountriesService = () => (Wrapped: any) => {
  return (props: any) => {
    return (
      <CountriesServiceConsumer>
        {(countriesService) => {
          return <Wrapped {...props} countriesService={countriesService} />;
        }}
      </CountriesServiceConsumer>
    );
  };
};

export default withCountriesService;
