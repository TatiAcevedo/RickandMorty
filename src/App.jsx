
import React, { useState } from 'react';
import Location from './components/Location';
import LocationInput from './components/LocationInput';


const App = () => {
  const [locationId, setLocationId] = useState(null);

  const handleLocationChange = (id) => {
    setLocationId(id);
  };

  return (
    <div>
      <h1>Ubicaciones de Rick and Morty</h1>
      <LocationInput onLocationChange={handleLocationChange} />
      {locationId && <Location locationId={locationId} />}
    </div>
  );
};

export default App;
