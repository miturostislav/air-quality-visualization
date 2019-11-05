import * as React from 'react';
import {API, Country} from './types';
import ajaxRequest from './helpers/ajaxRequest';
import closeCircle from '../svg/close-circle.svg';

interface CountryFilterProps {
  selectedCountries: Country[]
  setSelectedCountries: (countries: Country[]) => void
}

function CountryFilter({ selectedCountries, setSelectedCountries }: CountryFilterProps): React.ReactElement {
  const [countryInput, setCountryInput] = React.useState('');
  const [countries, setCountries] = React.useState<Country[]>([]);
  const filteredCountriesByInput = React.useMemo(() => (
    countries.filter((country) => (
      selectedCountries.indexOf(country) === -1 &&
      country.name && country.name.toLowerCase().indexOf(countryInput.toLocaleLowerCase()) === 0
    ))
  ), [countryInput, countries, selectedCountries]);
  const [isSelectorFocused, setIsSelectorFocused] = React.useState(false);
  const inputSelectorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ajaxRequest({ method: 'GET', url: API.GET_COUNTRIES }).then(({ results }: { results: Country[] }) => {
      setCountries(results);
    })
  }, []);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (inputSelectorRef.current && !inputSelectorRef.current.contains(e.target as Node)) {
        onBlur();
      }
    }

    document.body.addEventListener('click', onClick);
    return () => document.body.removeEventListener('click', onClick);
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setCountryInput(e.target.value);
  }

  function onFocus() {
    setIsSelectorFocused(true);
  }

  function onBlur() {
    setIsSelectorFocused(false);
  }

  function selectCountry(country: Country) {
    setSelectedCountries([...selectedCountries, country]);
    setCountryInput('');
    setIsSelectorFocused(false);
  }

  function removeCountry(countryToRemove: Country) {
    setSelectedCountries(selectedCountries.filter((country) => country !== countryToRemove));
  }

  return (
    <div className="filter">
      <p className="filter__title">
        Country
      </p>
      <div className={`input-selector ${isSelectorFocused ? 'input-selector--has-focus' : ''}`} ref={inputSelectorRef}>
        <div className="input-selector__input-wrapper">
          <input
            type="text"
            className={`input-selector__input ${!!countryInput ? 'input-selector__input--has-value' : ''}`}
            name="countrySelector"
            id="countrySelector"
            onFocus={onFocus}
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
                  <button className="input-selector__suggestions-item-button" onClick={() => selectCountry(country)}>{country.name}</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <ul className="filter__tags">
        {
          selectedCountries.map((country) => (
            <li className="filter__tag">
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