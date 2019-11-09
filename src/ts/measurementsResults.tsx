import * as React from 'react';
import { Location, Measurement, API } from './types';
import ajaxRequest from './helpers/ajaxRequest';

interface MeasurementsResultsProps {
  location: Location;
  goBack: () => void;
}

function MeasurementsResults({ location, goBack }: MeasurementsResultsProps) {
  const [measurements, setMeasurements] = React.useState<Measurement[]>([]);
  const [page, setPage] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    const parametersQuery = `parameter[]=${location.parameters.join('&parameter[]=')}`;
    const dateFrom = new Date();
    const dateTo = new Date();

    dateFrom.setDate(dateFrom.getDate() - page);
    dateTo.setDate(dateTo.getDate() - page + 1);
    setIsFetching(true);
    ajaxRequest({
      method: 'GET',
      url: `${API.GET_MEASUREMENTS}?city=${location.city}&country=${location.country}&location=${location.location}&` +
      `${parametersQuery}&limit=1000&date_from=${formatDate(dateFrom)}&date_to=${formatDate(dateTo)}`
    }).then(({ meta, results }) => {
      setMeasurements((prevMeasurements) => ([...prevMeasurements, ...results]));
    }).finally(() => {
      setIsFetching(false);
    });
  }, [location, page]);

  return (
    <div className={`location-data-page ${isFetching ? 'location-data-page--disabled' : ''}`}>
      <button className="location-data-page__back-button hide-xs-only" onClick={goBack}>Go back</button>
      {
        isFetching && measurements.length === 0 ? (
          <p className="data-description">Fetching...</p>
        ) : measurements.length === 0 ? (
          <p className="data-description">No Results</p>
        ) : (
          <div className="location-data-page__results-wrapper">
            <table className="location-data-page__results">
              <caption className="a11y-invisible-element">Location measurements</caption>
              <thead className="a11y-invisible-element-xs-only">
              <tr role="row" className="location-data-page__item">
                <th role="columnheader" className="location-data-page__location location-data-page__field" scope="col">Location</th>
                <th role="columnheader" className="location-data-page__city location-data-page__field" scope="col">City</th>
                <th role="columnheader" className="location-data-page__country location-data-page__field" scope="col">Country</th>
                <th role="columnheader" className="location-data-page__parameter location-data-page__field" scope="col">Parameter</th>
                <th role="columnheader" className="location-data-page__value location-data-page__field" scope="col">Value</th>
                <th role="columnheader" className="location-data-page__unit location-data-page__field" scope="col">Unit</th>
                <th role="columnheader" className="location-data-page__coordinates location-data-page__field" scope="col">Coordinates</th>
                <th role="columnheader" className="location-data-page__date location-data-page__field" scope="col">Date</th>
              </tr>
              </thead>
              <tbody>
              {
                measurements.map((measurement) => {
                  const date = new Date(measurement.date.local);
                  const formattedDate = `${formatDate(date)}, ` +
                    `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

                  return (
                    <tr role="row" key={measurement.date.local} className="location-data-page__item">
                      <td role="cell" className="location-data-page__location location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Location</span>
                        <span className="location-data-page__col-data ">{measurement.location}</span>
                      </td>
                      <td role="cell" className="location-data-page__city location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>City</span>
                        <span className="location-data-page__col-data ">{measurement.city}</span>
                      </td>
                      <td role="cell" className="location-data-page__country location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Country</span>
                        <span className="location-data-page__col-data ">{measurement.country}</span>
                      </td>
                      <td role="cell" className="location-data-page__parameter location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Parameter</span>
                        <span className="location-data-page__col-data ">{measurement.parameter}</span>
                      </td>
                      <td role="cell" className="location-data-page__value location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Value</span>
                        <span className="location-data-page__col-data">{measurement.value}</span>
                      </td>
                      <td role="cell" className="location-data-page__unit location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Unit</span>
                        <span className="location-data-page__col-data">{measurement.unit}</span>
                      </td>
                      <td role="cell" className="location-data-page__coordinates location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Coordinates</span>
                        <span className="location-data-page__col-data">
                          {measurement.coordinates.latitude.toFixed(4)}, {measurement.coordinates.longitude.toFixed(4)}
                        </span>
                      </td>
                      <td role="cell" className="location-data-page__date location-data-page__field">
                        <span className="location-data-page__col-header hide-sm-up" aria-hidden>Date</span>
                        <span className="location-data-page__col-data">{formattedDate}</span>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
            {
              page < 7 && (
                <button className="search-results__show-more-button" onClick={() => setPage(page + 1)} disabled={isFetching}>
                  Show one more page
                </button>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default MeasurementsResults;

function formatDate(date: Date) {
  return `${date.getFullYear()}` +
    `-${String(date.getMonth() + 1).padStart(2, '0')}` +
    `-${String(date.getDate()).padStart(2, '0')}`
}