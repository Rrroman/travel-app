import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/video-react/dist/video-react.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import App from './components/App/App';
import ErrorBoundary from './components/error-boundary/error-boundary';
import CountriesService from './services/countries-service';
import { CountriesServiceProvider } from './components/countries-service-context/countries-service-context';
import './i18n';

import store from './store';

const countriesService = new CountriesService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <CountriesServiceProvider value={countriesService}>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </CountriesServiceProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
