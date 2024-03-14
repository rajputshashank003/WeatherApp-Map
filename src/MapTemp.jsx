import React, { useState } from 'react';
import BingMaps from 'react-bingmaps';

const MapTemp = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations/${encodeURIComponent(location)}?key=AlTlwj9S5zW6F5keWo0l5F_yI4aEsPlB7V0a5HgrCMAitU4lQ`);
      const data = await response.json();
      if (data && data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources && data.resourceSets[0].resources.length > 0) {
        const coordinates = data.resourceSets[0].resources[0].point.coordinates;
        setCoordinates(coordinates);
        console.log('Coordinates:', coordinates);
      } else {
        console.log('Location not found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <div>
      <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default MapTemp;
