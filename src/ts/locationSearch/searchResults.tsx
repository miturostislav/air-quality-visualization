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
          <>
            <h3 className="data-description">{nrOfResults} Results</h3>
            <table className="search-results__list">
              <caption className="a11y-invisible-element">Search results</caption>
              <thead className="a11y-invisible-element-xs-only">
              <tr role="row" className="table-row">
                <th role="columnheader" className="search-results__location table-cell" scope="col">Identifier</th>
                <th role="columnheader" className="search-results__city table-cell" scope="col">City</th>
                <th role="columnheader" className="search-results__country table-cell" scope="col">Country</th>
                <th role="columnheader" className="search-results__count table-cell" scope="col">Count</th>
                <th role="columnheader" className="search-results__parameters table-cell" scope="col">Parameters</th>
              </tr>
              </thead>
              <tbody>
              {
                locations.map((location) => (
                  <tr
                    role="row button"
                    key={location.id}
                    className="table-row"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <td role="cell" className="search-results__location table-cell">
                      <span className="table-col-header hide-sm-up" aria-hidden>Identifier</span>
                      <span className="table-col-data ">{location.location}</span>
                    </td>
                    <td role="cell" className="search-results__city table-cell">
                      <span className="table-col-header hide-sm-up" aria-hidden>City</span>
                      <span className="table-col-data ">{location.city}</span>
                    </td>
                    <td role="cell" className="search-results__country table-cell">
                      <span className="table-col-header hide-sm-up" aria-hidden>Country</span>
                      <span className="table-col-data ">{location.country}</span>
                    </td>
                    <td role="cell" className="search-results__count table-cell">
                      <span className="table-col-header hide-sm-up" aria-hidden>Count</span>
                      <span className="search-results__col-count ">{location.count}</span>
                    </td>
                    <td role="cell" className="search-results__parameters table-cell">
                      <span className="table-col-header hide-sm-up" aria-hidden>Parameters</span>
                      <span className="table-col-data">
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
          </>
        )
      }
      {
        nrOfResults > locations.length && (
          <button className="button-primary" onClick={incrementPage} disabled={isFetching}>Show more</button>
        )
      }
    </div>
  );
}

export default SearchResults;