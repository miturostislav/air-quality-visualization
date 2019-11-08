import * as React from 'react';
import { Location } from './types';

interface SearchResultsProps {
  locations: Location[];
  setSelectedLocation: (location: Location) => void;
  nrOfResults: number;
  incrementPage: () => void;
  isFetching: boolean
}

function SearchResults({ locations, setSelectedLocation, nrOfResults, incrementPage, isFetching }: SearchResultsProps) {
  return (
    <div className={`search-results ${isFetching ? 'search-results--disabled' : ''}`}>
      {
        isFetching ? (
          <p className="search-results__no-results">Fetching...</p>
        ) : nrOfResults === 0 ? (
          <p className="search-results__no-results">No Results</p>
        ) : (
          <>
            <div className="search-results__titles">
              <span className="search-results__location-title">Identifier</span>
              <span className="search-results__country-title">Country</span>
              <span className="search-results__city-title">City</span>
              <span className="search-results__count-title">Count</span>
              <span className="search-results__parameters-title">Parameters</span>
            </div>
            <ul>
              {
                locations.map((location) => (
                  <li key={`${location.location}-${location.city}-${location.country}-${location.count}`}>
                    <button className="search-results__item" onClick={() => setSelectedLocation(location)} disabled={isFetching}>
                      <span className="search-results__location search-results__field">{location.location}</span>
                      <span className="search-results__country search-results__field">{location.country}</span>
                      <span className="search-results__city search-results__field">{location.city}</span>
                      <span className="search-results__count search-results__field">{location.count}</span>
                      <span className="search-results__parameters search-results__field">
                  {
                    location.parameters.map((parameter) => (
                      <span key={parameter} className="search-results__parameter">{parameter}</span>
                    ))
                  }
                </span>
                    </button>
                  </li>
                ))
              }
            </ul>
            {
              nrOfResults > locations.length && (
                <button className="search-results__show-more-button" onClick={incrementPage} disabled={isFetching}>Show more</button>
              )
            }
          </>
        )
      }
    </div>
  );
}

export default SearchResults;