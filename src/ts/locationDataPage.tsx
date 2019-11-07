import * as React from 'react';
import { Location, API } from './types';
import ajaxRequest from './helpers/ajaxRequest';

interface LocationDataPageProps {
  location: Location;
}

function LocationDataPage({ location }: LocationDataPageProps) {
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
    }).then((res) => {
      console.log(res);
    })
  });

  return (
    <div>Display data</div>
  );
}

export default LocationDataPage;
