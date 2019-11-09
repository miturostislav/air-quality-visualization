import * as React from 'react';
import { Location } from '../types';

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
        isFetching && nrOfResults === 0 ? (
          <p className="data-description">Fetching...</p>
        ) : nrOfResults === 0 ? (
          <p className="data-description">No Results</p>
        ) : (
          <table className="search-results__list">
            <caption className="a11y-invisible-element">Search results</caption>
            <thead className="a11y-invisible-element-xs-only">
            <tr role="row" className="search-results__item">
              <th role="columnheader" className="search-results__location search-results__field" scope="col">Identifier</th>
              <th role="columnheader" className="search-results__city search-results__field" scope="col">Country</th>
              <th role="columnheader" className="search-results__country search-results__field" scope="col">City</th>
              <th role="columnheader" className="search-results__count search-results__field" scope="col">Count</th>
              <th role="columnheader" className="search-results__parameters search-results__field" scope="col">Parameters</th>
            </tr>
            </thead>
            <tbody>
            {
              locations.map((location) => (
                <tr
                  role="row"
                  key={`${location.location}-${location.city}-${location.country}-${location.count}`}
                  className="search-results__item"
                  onClick={() => setSelectedLocation(location)}
                >
                  <td role="cell" className="search-results__location search-results__field">
                    <span className="search-results__col-header hide-sm-up" aria-hidden>Identifier</span>
                    <span className="search-results__col-data ">{location.location}</span>
                  </td>
                  <td role="cell" className="search-results__city search-results__field">
                    <span className="search-results__col-header hide-sm-up" aria-hidden>City</span>
                    <span className="search-results__col-data ">{location.city}</span>
                  </td>
                  <td role="cell" className="search-results__country search-results__field">
                    <span className="search-results__col-header hide-sm-up" aria-hidden>Country</span>
                    <span className="search-results__col-data ">{location.country}</span>
                  </td>
                  <td role="cell" className="search-results__count search-results__field">
                    <span className="search-results__col-header hide-sm-up" aria-hidden>Count</span>
                    <span className="search-results__col-count ">{location.count}</span>
                  </td>
                  <td role="cell" className="search-results__parameters search-results__field">
                    <span className="search-results__col-header hide-sm-up" aria-hidden>Parameters</span>
                    <span className="search-results__col-data">
                      {
                        location.parameters.map((parameter) => (
                          <span key={parameter} className="search-results__parameter">{parameter}</span>
                        ))
                      }
                    </span>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        )
      }
      {
        nrOfResults > locations.length && (
          <button className="search-results__show-more-button" onClick={incrementPage} disabled={isFetching}>Show more</button>
        )
      }
    </div>
  );
}

export default SearchResults;