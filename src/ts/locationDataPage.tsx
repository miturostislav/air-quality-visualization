import * as React from 'react';
import { Location, Measurement, API } from './types';
import ajaxRequest from './helpers/ajaxRequest';

interface LocationDataPageProps {
  location: Location;
  goBack: () => void;
}

function LocationDataPage({ location, goBack }: LocationDataPageProps) {
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
      <button className="location-data-page__back-button" onClick={goBack}>Go back</button>
      <table className="location-data-page__results">
        <caption className="a11y-invisible-element">Location measurements</caption>
        <thead>
          <tr role="row" className="location-data-page__item">
            <th role="columnheader" className="location-data-page__location" scope="col">Location</th>
            <th role="columnheader" className="location-data-page__city" scope="col">City</th>
            <th role="columnheader" className="location-data-page__country" scope="col">Country</th>
            <th role="columnheader" className="location-data-page__parameter" scope="col">Parameter</th>
            <th role="columnheader" className="location-data-page__value" scope="col">Value</th>
            <th role="columnheader" className="location-data-page__unit" scope="col">Unit</th>
            <th role="columnheader" className="location-data-page__coordinates" scope="col">Coordinates</th>
            <th role="columnheader" className="location-data-page__date" scope="col">Date</th>
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
                  <td role="cell" className="location-data-page__location">{measurement.location}</td>
                  <td role="cell" className="location-data-page__city">{measurement.city}</td>
                  <td role="cell" className="location-data-page__country">{measurement.country}</td>
                  <td role="cell" className="location-data-page__parameter">{measurement.parameter}</td>
                  <td role="cell" className="location-data-page__value">{measurement.value}</td>
                  <td role="cell" className="location-data-page__unit">{measurement.unit}</td>
                  <td role="cell" className="location-data-page__coordinates">
                    {measurement.coordinates.latitude.toFixed(4)}, {measurement.coordinates.longitude.toFixed(4)}
                  </td>
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

export default LocationDataPage;
