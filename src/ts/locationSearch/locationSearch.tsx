import * as React from 'react';
import LocationSearchBar from './locationSearchBar';
import CountryFilter from './countryFilter';
import CityFilter from './cityFilter';
import ParameterFilter from './parameterFilter';
import SearchResults from './searchResults';
import {Country, City, Parameter, Location} from '../types';

interface LocationSearchProps {
  setSelectedLocation: (location: Location) => void
}

function LocationSearch({ setSelectedLocation }: LocationSearchProps) {
  const [selectedCountries, setSelectedCountries] = React.useState<Country[]>([]);
  const [selectedCities, setSelectedCities] = React.useState<City[]>([]);
  const [selectedParameters, setSelectedParameters] = React.useState<Parameter[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [isFilerSectionOpened, setIsFilerSectionOpened] = React.useState(true);
  const [nrOfResults, setNrOfResults] = React.useState(0);
  const filtersWrapperRef = React.useRef<HTMLDivElement>(null);
  const incrementPageRef = React.useRef(() => {});
  const filterQuery = React.useMemo(() => {
    const countriesQuery = selectedCountries.length ? `country[]=${selectedCountries.map((country) => country.code).join('&country[]=')}&` : '';
    const citiesQuery = selectedCities.length ? `city[]=${selectedCities.map((city) => city.name).join('&city[]=')}&` : '';
    const parametersQuery = selectedParameters.length ? `parameter[]=${selectedParameters.join('&parameter[]=')}&` : '';

    return `?${countriesQuery}${citiesQuery}${parametersQuery}limit=10`;
  }, [selectedCountries, selectedCities, selectedParameters]);

  return (
    <div className="location-search">
      <LocationSearchBar
        locations={locations}
        setLocations={setLocations}
        setNrOfResults={setNrOfResults}
        incrementPageRef={incrementPageRef}
        setIsFetching={setIsFetching}
        filterQuery={filterQuery}
      />
      <div className="location-search__filters">
        <button className="location-search__filters-title" onClick={() => setIsFilerSectionOpened(!isFilerSectionOpened)}>Filters</button>
        <div
          className="location-search__filters-wrapper"
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
      <SearchResults
        locations={locations}
        setSelectedLocation={setSelectedLocation}
        nrOfResults={nrOfResults}
        incrementPage={incrementPageRef.current}
        isFetching={isFetching}
      />
    </div>
  );
}

export default LocationSearch;