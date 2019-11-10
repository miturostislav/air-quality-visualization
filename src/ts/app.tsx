import React from 'react';
import LocationSearch from './locationSearch/locationSearch';
import MeasurementsResults from './measurementsResults';
import {Location} from './types';
import mediaQuery from './helpers/mediaQuery';

function App() {
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);
  const headerRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(!mediaQuery.isMediumUp());

  React.useEffect(() => {
    function onResize() {
      const isMobileAfterResize = !mediaQuery.isMediumUp();

      if (isMobileAfterResize !== isMobile) {
        setIsMobile(isMobileAfterResize);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobile]);

  return (
    <div className="page">
      <header className="page__header" ref={headerRef}>
        <h1 className="page__title">Air quality data</h1>
        <h2 className="page__sub-title">Find air quality data for a particular location</h2>
      </header>
      <main>
        {
          selectedLocation ? (
            <MeasurementsResults
              location={selectedLocation}
              goBack={() => setSelectedLocation(null)}
              headerRef={headerRef}
              isMobile={isMobile}
            />
          ) : (
            <LocationSearch
              setSelectedLocation={setSelectedLocation}
              isMobile={isMobile}
            />
          )
        }
      </main>
      <footer className="page__footer">page footer</footer>
    </div>
  );
}

export default App;
