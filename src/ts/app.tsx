import React from 'react';
import CountrySelector from './countrySelector';
import CountryFilter from './countryFilter';
import { Country } from './types';

function App() {
  const [selectedCountries, setSelectedCountries] = React.useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Air quality data</h1>
        <h2 className="page__sub-title">Find air quality data for a particular location</h2>
      </header>
      <main className="page__body">
        <CountrySelector selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <div className="page__filters">
          <CountryFilter selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
          <hr className="separator" />
        </div>
        <div className="page__results">Page results</div>
      </main>
      <footer className="page__footer">page footer</footer>
    </div>
  );
}

export default App;
