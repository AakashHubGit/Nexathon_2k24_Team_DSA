import React, { useEffect, useState ,useRef} from 'react';
import Hero from './Hero';
import HomeCard from './HomeCard';
import Modale from './Modale';
import axios from 'axios';
import Carousal from './Carousal';
import "../css/Home.css"

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const homeCardsRef = useRef(null);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/property/properties');
      console.log(response.data.properties);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
    console.log(properties);
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
    if (predictionResult && predictionResult.location) {
      setCurrentCity(predictionResult.location);
      console.log(predictionResult.location);
      console.log(predictionResult.type);
    }
  }, [predictionResult]);
  useEffect(() => {
    if (currentCity) {
      // Scroll to HomeCards section when currentCity is set
      homeCardsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentCity]);

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

  const setAreaRange = (category) => {
    switch (category) {
      case 'A':
        return { min: 300, max: 700 };
      case 'B':
        return { min: 700, max: 1200 };
      case 'C':
        return { min: 1200, max: 1801 };
      case 'D':
        return { min: 1800, max: 2500 };
      default:
        return { min: 0, max: Infinity }; // Default range
    }
  };

  const filteredProperties = properties.filter(property => {
    // Check if property location matches current city
    if (currentCity && !property.location.toLowerCase().includes(currentCity.toLowerCase())) {
      return false;
    }

    // Check if property sqft falls within the range of the prediction result category
    const sqftRange = setAreaRange(predictionResult?.category);
    const propertySqft = parseInt(property.area);
    if (propertySqft < sqftRange.min || propertySqft >= sqftRange.max) {
      return false;
    }

    if (predictionResult?.type && property.type !== predictionResult.type) {
      return false;
    }


    return true;
  });
  return (
    <div className="homeContainer">
      <Hero setPredictionResult={setPredictionResult} />
      {currentCity ?
        <div ref={homeCardsRef}>{filteredProperties.map((property) => (

          <HomeCard
            id={property._id}
            img={property.filePath}
            name={property.name}
            builder={property.builder}
            location={property.location}
            status={property.status}
            area={property.area}
            size={property.size}
            price={property.price}
            price_unit={property.price_unit}
          />
        ))}
        </div>
        :
        <>
          {properties.map((property) => (
            <HomeCard
              id={property._id}
              key={property._id}
              img={property.filePath}
              name={property.name}
              builder={property.builder}
              location={property.location}
              status={property.status}
              area={property.area}
              size={property.size}
              price={property.price}
              price_unit={property.price_unit}
            />
          ))}
        </>
      }
      <Modale />
      <Carousal />
    </div>
  );
};

export default Home;
