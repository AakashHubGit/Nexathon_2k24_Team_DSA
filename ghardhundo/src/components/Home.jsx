import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import HomeCard from './HomeCard';
import Modale from './Modale';
import axios from 'axios';
import Carousal from './Carousal';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/property/properties');
      console.log(response.data.properties);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  const setAreaRange = (category) => {
    switch (category) {
      case 'A':
        return { min: 300, max: 500 };
      case 'B':
        return { min: 500, max: 1000 };
      case 'C':
        return { min: 1000, max: 1250 };
      case 'D':
        return { min: 1250, max: 1500 };
      default:
        return { min: 0, max: Infinity }; // Default range
    }
  };

  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      let city = null;
      if (data.address && data.address.city) {
        city = data.address.city;
      } else if (data.address && data.address.town) {
        city = data.address.town;
      } else if (data.address && data.address.village) {
        city = data.address.village;
      } else if (data.address && data.address.county) {
        city = data.address.county;
      }
      setCurrentCity(city);
    } catch (error) {
      console.error('Error getting city from coordinates:', error);
    }
  };

  useEffect(() => {
    fetchProperties();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  useEffect(() => {
    if (predictionResult && predictionResult.prediction) {
      setCurrentCity(predictionResult.prediction);
    } else {
      setCurrentCity(currentCity);
    }
  }, [predictionResult, currentCity]);

  return (
    <div>
      <Hero setPredictionResult={setPredictionResult}/>
      {properties.map((property) => {
        if (currentCity && property.location === currentCity) {
          return (
            <HomeCard
            id={property._id}
              key={property._id}
              img={property.filePath}
              name={property.name}
              builder={property.builder}
              location={property.location}
              status={property.status}
              bhk={property.size}
              price={property.price}
            />
          );
        } else {
          <HomeCard
              key={property._id}
              img={property.filePath}
              name={property.name}
              builder={property.builder}
              location={property.location}
              status={property.status}
              bhk={property.size}
              price={property.price}
            />
        }
      })}
      <Carousal/>
      {/* <Modale /> */}
    </div>
  );
};

export default Home;