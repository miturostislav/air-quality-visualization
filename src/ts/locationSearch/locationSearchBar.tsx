import * as React from 'react';
import ajaxRequest from '../helpers/ajaxRequest';
import {Location, API} from '../types';

interface LocationSearchBarProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  setNrOfResults: React.Dispatch<React.SetStateAction<number>>;
  incrementPageRef: React.MutableRefObject<Function>;
  setIsFetching: (isFetching: boolean) => void;
  filterQuery: string;
}

function LocationSearchBar({
  setLocations,
  setNrOfResults,
  incrementPageRef,
  setIsFetching,
  filterQuery,
}: LocationSearchBarProps): React.ReactElement {
  const [input, setInput] = React.useState('');
  const [locationIdentifier, setLocationIdentifier] = React.useState('');
  const pageRef = React.useRef(1);
  const query = React.useMemo(() => {
    return `${filterQuery}${locationIdentifier ? `&location=${locationIdentifier}` : ''}`
  }, [filterQuery, locationIdentifier]);
  const fetchLocations = React.useCallback(() => {
    const abortController = new AbortController();
    setIsFetching(true);
    ajaxRequest({ method: 'GET', url: `${API.GET_LOCATIONS}${query}&page=${pageRef.current}`, fields: { signal: abortController.signal} })
      .then(({ meta, results }) => {
        setNrOfResults(meta.found);
        setLocations((locations) => pageRef.current === 1 ? results : [...locations, ...results]);
      }).finally(() => {
      setIsFetching(false);
    });
    return () => abortController.abort();
  }, [query, setLocations, setNrOfResults, setIsFetching]);

  React.useEffect(() => {
    incrementPageRef.current = () => {
      pageRef.current++;
      fetchLocations();
    };
  }, [fetchLocations, incrementPageRef]);

  React.useEffect(() => {
    pageRef.current = 1;
    return fetchLocations();
  }, [fetchLocations]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLocationIdentifier(input)
  }

  return (
    <form className="location-search-bar" onSubmit={onSubmit}>
      <div className="input-selector">
        <div className="input-selector__input-wrapper">
          <input
            type="text"
            className={`input-selector__input ${!!input ? 'input-selector__input--has-value' : ''}`}
            name="countrySelector"
            id="countrySelector"
            onChange={onChange}
            value={input}
            autoComplete="ignore"
          />
          <label className="input-selector__label" htmlFor="countrySelector">Enter a location identifier</label>
        </div>
      </div>
      <button type="submit" className="location-search-bar__button">Search</button>
    </form>
  );
}

export default LocationSearchBar;