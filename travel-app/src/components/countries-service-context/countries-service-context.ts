import React from 'react';

const {
  Provider: CountriesServiceProvider,
  Consumer: CountriesServiceConsumer,
} = React.createContext({});

export { CountriesServiceProvider, CountriesServiceConsumer };
