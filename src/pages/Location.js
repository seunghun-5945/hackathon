import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

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
        (position) => {
          setLocation(position.coords);
          setError(null);
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
    <Container className="App">
      <h1>Current Location Finder</h1>
      <p>
        Click the button below to get your current location:
      </p>
      <button onClick={getLocation}>Get Current Location</button>

      {error && <p>Error: {error}</p>}
      {location && (
        <div>
          <h2>Your Location:</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </Container>
  );
};


const Location = () => {
  return <Layout Content={<LocationExample/>} />
}

export default Location;
