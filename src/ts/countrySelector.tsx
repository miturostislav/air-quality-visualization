import * as React from 'react';
import ajaxRequest from './helpers/ajaxRequest';
import InputSelector from './inputSelector';
import {Country, API} from './types';

interface CountrySelectorProps {
  selectedCountry: Country | null
  setSelectedCountry: (country: Country) => void
}

function CountrySelector({ selectedCountry, setSelectedCountry }: CountrySelectorProps): React.ReactElement {
  const [countries, setCountries] = React.useState<Country[]>([]);

  React.useState(() => {
    ajaxRequest({ method: 'GET', url: API.GET_COUNTRIES }).then(({ results }: { results: Country[] }) => {
      setCountries(results);
    })
  });

  return (
    <InputSelector values={countries} onSelectValue={setSelectedCountry} label="Enter a country name" />
  );
}

export default CountrySelector;