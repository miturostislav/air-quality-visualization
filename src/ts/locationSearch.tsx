import * as React from 'react';
import ajaxRequest from './helpers/ajaxRequest';
import InputSelector from './inputSelector';
import {Country, API} from './types';

interface LocationSearchProps {
  selectedCountry: Country | null
  setSelectedCountry: (country: Country) => void
}

function LocationSearch({ selectedCountry, setSelectedCountry }: LocationSearchProps): React.ReactElement {
  const [countries, setCountries] = React.useState<Country[]>([]);

  React.useState(() => {
    ajaxRequest({ method: 'GET', url: API.GET_COUNTRIES }).then(({ results }: { results: Country[] }) => {
      setCountries(results);
    })
  });

  return (
    <InputSelector values={countries} onSelectValue={setSelectedCountry} label="Enter a location name" />
  );
}

export default LocationSearch;