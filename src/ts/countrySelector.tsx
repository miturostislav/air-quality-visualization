import * as React from 'react';
import ajaxRequest from './helpers/ajaxRequest';
import {Country, API} from './types';

interface CountrySelectorProps {
  selectedCountry: Country | null
  setSelectedCountry: (country: Country) => void
}

function CountrySelector({ selectedCountry, setSelectedCountry }: CountrySelectorProps): React.ReactElement {
  const [countryInput, setCountryInput] = React.useState('');
  const [countries, setCountries] = React.useState<Country[]>([]);
  const filteredCountriesByInput = React.useMemo(() => (
    // @TODO Improve the filter algorithm
    countries.filter((country) => country.name && country.name.toLowerCase().indexOf(countryInput.toLocaleLowerCase()) === 0)
  ), [countryInput, countries]);
  const [isSelectorFocused, setIsSelectorFocused] = React.useState(false);

  React.useState(() => {
    ajaxRequest({ method: 'GET', url: API.GET_COUNTRIES }).then(({ results }: { results: Country[] }) => {
      setCountries(results.sort((a, b) => a.name < b.name ? -1 : 1));
    })
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setCountryInput(e.target.value);
  }

  function onFocus() {
    setIsSelectorFocused(true);
  }

  function onBlur() {
    if (!filteredCountriesByInput.length) {
      setIsSelectorFocused(false);
    }
  }

  function onCountrySelect(country: Country) {
    setSelectedCountry(country);
    setCountryInput(country.name);
    setIsSelectorFocused(false);
  }

  return (
    <div className={`input-selector ${isSelectorFocused ? 'input-selector--has-focus' : ''}`}>
      <div className="input-selector__input-wrapper">
        <input
          type="text"
          className={`input-selector__input ${!!countryInput ? 'input-selector__input--has-value' : ''}`}
          name="countrySelector"
          id="countrySelector"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={countryInput}
        />
        <label className="input-selector__label" htmlFor="countrySelector">Enter a country name</label>
      </div>
      <div className="input-selector__suggestions">
        <ul className="input-selector__suggestions-list">
          {
            filteredCountriesByInput.map((country) => (
              <li key={country.code} className="input-selector__suggestions-item">
                <button className="input-selector__suggestions-item-button" onClick={() => onCountrySelect(country)}>{country.name}</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default CountrySelector;