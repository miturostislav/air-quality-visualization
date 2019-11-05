import * as React from 'react';
import {API, City, Country} from './types';
import ajaxRequest from './helpers/ajaxRequest';
import InputSelector from './inputSelector';
import closeCircle from '../svg/close-circle.svg';

interface CityFilterProps {
  selectedCities: City[];
  setSelectedCities: React.Dispatch<React.SetStateAction<City[]>>;
  selectedCountries: Country[];
}

function CityFilter({ selectedCities, setSelectedCities, selectedCountries }: CityFilterProps): React.ReactElement {
  const [cities, setCities] = React.useState<City[]>([]);
  const unselectedCities = React.useMemo(() => (
    cities.filter((city) => selectedCities.indexOf(city) === -1 &&
      !!selectedCountries.find((country) => country.code === city.country)
    )),
  [cities, selectedCountries, selectedCities]
  );
  const [countriesAlreadyFetchedFor, setCountriesAlreadyFetchedFor] = React.useState<Country[]>([]);
  const countriesToFetchFor = React.useMemo(() =>
    selectedCountries.filter((country) => countriesAlreadyFetchedFor.indexOf(country) === -1),
    [selectedCountries, countriesAlreadyFetchedFor]
  );

  React.useEffect(function filterCitiesByCountries() {
    if (countriesToFetchFor.length === 0) {
      setSelectedCities((currentSelectedCities) =>
        currentSelectedCities.filter((city) => !!selectedCountries.find((country) => country.code === city.country))
      );
    }
  }, [selectedCountries, countriesToFetchFor, setSelectedCities]);

  React.useEffect(function fetchCitiesByCountries() {
    const promises = countriesToFetchFor.map((country) => (
      ajaxRequest({ method: 'GET', url: API.GET_CITIES, data: { country: country.code } }).then(
        ({ results }: { results: City[] }) => results.filter((city) => city.name !== 'N/A' && city.name !== 'unused'))
    ));
    if (promises.length) {
      Promise.all(promises).then((res) => {
        setCities((currentCities) => (
          res.reduce((acc, curr) => {
            acc.push(...curr);
            return acc;
          }, [...currentCities])
        ));
        setCountriesAlreadyFetchedFor([...countriesAlreadyFetchedFor, ...countriesToFetchFor]);
      });
    }
  }, [countriesToFetchFor, countriesAlreadyFetchedFor]);

  function onSelectCity(city: City) {
    setSelectedCities([...selectedCities, city]);
  }

  function removeCity(cityToRemove: City) {
    setSelectedCities(selectedCities.filter((city) => city !== cityToRemove));
  }

  return (
    <div className="filter">
      <p className="filter__title">
        City
      </p>
      <InputSelector values={unselectedCities} onSelectValue={onSelectCity} label="Enter a city name" />
      <ul className="filter__tags">
        {
          selectedCities.map((city) => (
            <li key={city.name} className="filter__tag">
              <span>{city.name}</span>
              <button className="filter__remove-button" onClick={() => removeCity(city)}>
                <img className="filter__remove-img" src={closeCircle} alt="Remove filter"/>
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default CityFilter;