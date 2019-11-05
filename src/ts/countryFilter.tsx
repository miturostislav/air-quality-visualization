import * as React from 'react';
import {API, Country} from './types';
import ajaxRequest from './helpers/ajaxRequest';
import InputSelector from './inputSelector';
import closeCircle from '../svg/close-circle.svg';

interface CountryFilterProps {
  selectedCountries: Country[]
  setSelectedCountries: (countries: Country[]) => void
}

function CountryFilter({ selectedCountries, setSelectedCountries }: CountryFilterProps): React.ReactElement {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const unselectedCountries = React.useMemo(() => countries.filter((country) => selectedCountries.indexOf(country) === -1), [countries, selectedCountries])

  React.useEffect(() => {
    ajaxRequest({ method: 'GET', url: API.GET_COUNTRIES }).then(({ results }: { results: Country[] }) => {
      setCountries(results);
    })
  }, []);

  function onSelectCountry(country: Country) {
    setSelectedCountries([...selectedCountries, country]);
  }

  function removeCountry(countryToRemove: Country) {
    setSelectedCountries(selectedCountries.filter((country) => country !== countryToRemove));
  }

  return (
    <div className="filter">
      <p className="filter__title">
        Country
      </p>
      <InputSelector values={unselectedCountries} onSelectValue={onSelectCountry} label="Enter a country name" />
      <ul className="filter__tags">
        {
          selectedCountries.map((country) => (
            <li key={country.name} className="filter__tag">
              <span>{country.name}</span>
              <button className="filter__remove-button" onClick={() => removeCountry(country)}>
                <img className="filter__remove-img" src={closeCircle} alt="Remove filter"/>
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default CountryFilter;