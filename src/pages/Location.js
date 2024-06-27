import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const LocationExample = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [xCoordinate, setXCoordinate] = useState()
  const [yCoordinate, setYCoordinate] = useState()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation(position.coords);
          setError(null);
        },
        (error) => {
          setError(error.message);
          setLocation(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 27000,
          maximumAge: 30000,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <>
      {error && <p>Error: {error}</p>}
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </>
  );
};

const Location = () => {
  return <Layout Content={<LocationExample />} />;
};

export default Location;
