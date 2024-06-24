import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: salmon;
`;

const LocationExample = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`http://localhost:8000/?data1=${longitude}&data2=${latitude}`);
            if (!response.ok) {
              throw new Error('Failed to fetch location data');
            }
            const data = await response.json();
            setLocation(data); // 데이터를 setLocation으로 설정
            setError(null);
          } catch (error) {
            setError(error.message);
            setLocation(null);
          }
        },
        (error) => {
          setError(error.message);
          setLocation(null);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Container>
      <h1>Current Location Finder</h1>
      <p>Click the button below to get your current location:</p>
      <button onClick={getLocation}>Get Current Location</button>

      {error && <p>Error: {error}</p>}
      {location && (
        <div>
          <h2>Your Location:</h2>
          <p>Address: {location.address}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </Container>
  );
};

export default LocationExample;
