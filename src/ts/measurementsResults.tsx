import * as React from 'react';
import { Location, Measurement, API } from './types';
import ajaxRequest from './helpers/ajaxRequest';

interface MeasurementsResultsProps {
  location: Location;
  goBack: () => void;
}

function MeasurementsResults({ location, goBack }: MeasurementsResultsProps) {
  const [measurements, setMeasurements] = React.useState<Measurement[]>([]);

  React.useEffect(() => {
    const parametersQuery = `parameter[]=${location.parameters.join('&parameter[]=')}`;
    const oneWeekAgoDate = new Date();

    oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7);
    ajaxRequest({
      method: 'GET',
      url: `${API.GET_MEASUREMENTS}?city=${location.city}&country=${location.country}&location=${location.location}&` +
      `${parametersQuery}&date_from=${oneWeekAgoDate.getFullYear()}` +
      `-${String(oneWeekAgoDate.getMonth()).padStart(2, '0')}` +
      `-${String(oneWeekAgoDate.getDate()).padStart(2, '0')}`
    }).then(({ results }) => {
      setMeasurements(results);
    })
  }, [location]);

  return (
    <div className="location-data-page">
      <button className="location-data-page__back-button hide-xs-only" onClick={goBack}>Go back</button>
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
              const formattedDate = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}` +
                `-${String(date.getDate()).padStart(2, '0')}`;

              return (
                <tr role="row" key={measurement.date.local} className="location-data-page__item">
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Location</span>
                  <td role="cell" className="location-data-page__location location-data-page__field">{measurement.location}</td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>City</span>
                  <td role="cell" className="location-data-page__city location-data-page__field">{measurement.city}</td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Country</span>
                  <td role="cell" className="location-data-page__country location-data-page__field">{measurement.country}</td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Parameter</span>
                  <td role="cell" className="location-data-page__parameter location-data-page__field">{measurement.parameter}</td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Value</span>
                  <td role="cell" className="location-data-page__value location-data-page__field">{measurement.value}</td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Unit</span>
                  <td role="cell" className="location-data-page__unit location-data-page__field">{measurement.unit}</td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Coordinates</span>
                  <td role="cell" className="location-data-page__coordinates location-data-page__field">
                    {measurement.coordinates.latitude.toFixed(4)}, {measurement.coordinates.longitude.toFixed(4)}
                  </td>
                  <span className="location-data-page__col-header hide-sm-up" aria-hidden>Dates</span>
                  <td role="cell" className="location-data-page__date">{formattedDate}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default MeasurementsResults;
