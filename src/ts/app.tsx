import React from 'react';
import LocationSearch from './locationSearch/locationSearch';
import MeasurementsResults from './measurementsResults';
import {Location} from './types';

function App() {
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Air quality data</h1>
        <h2 className="page__sub-title">Find air quality data for a particular location</h2>
      </header>
      <main>
        {
          selectedLocation ? (
            <MeasurementsResults location={selectedLocation} goBack={() => setSelectedLocation(null)} />
          ) : (
            <LocationSearch setSelectedLocation={setSelectedLocation} />
          )
        }
      </main>
      <footer className="page__footer">page footer</footer>
    </div>
  );
}

export default App;
