import React from 'react';
import LocationSearch from './locationSearch';
import CountryFilter from './countryFilter';
import CityFilter from './cityFilter';
import ParameterFilter from './parameterFilter';
import {Country, City, Parameter} from './types';

function App() {
  const [selectedCountries, setSelectedCountries] = React.useState<Country[]>([]);
  const [selectedCities, setSelectedCities] = React.useState<City[]>([]);
  const [selectedParameters, setSelectedParameters] = React.useState<Parameter[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
  const [isFilerSectionOpened, setIsFilerSectionOpened] = React.useState(true);
  const filtersWrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Air quality data</h1>
        <h2 className="page__sub-title">Find air quality data for a particular location</h2>
      </header>
      <main className="page__body">
        <LocationSearch selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <div className="page__filters">
          <button className="page__filters-title" onClick={() => setIsFilerSectionOpened(!isFilerSectionOpened)}>Filters</button>
          <div
            className="page__filters-wrapper"
            ref={filtersWrapperRef}
            style={{ maxHeight: isFilerSectionOpened ? (filtersWrapperRef.current ? filtersWrapperRef.current.scrollHeight : 0) : 0 }}
          >
            <CountryFilter selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
            <hr className="separator" />
            <CityFilter selectedCities={selectedCities} setSelectedCities={setSelectedCities} selectedCountries={selectedCountries} />
            <hr className="separator" />
            <ParameterFilter selectedParameters={selectedParameters} setSelectedParameters={setSelectedParameters} />
          </div>
        </div>
        <div className="page__results">Page results</div>
      </main>
      <footer className="page__footer">page footer</footer>
    </div>
  );
}

export default App;
