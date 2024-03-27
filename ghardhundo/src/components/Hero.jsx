import React, { useState } from 'react';
import heroImg from '../assets/hero.jpg';
import { Input, AutoComplete, Button } from 'antd'; // Import Button from Ant Design
import axios from 'axios';
import '../css/Hero.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Search } = Input;

const Hero = ({ setPredictionResult }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  async function predict(inputData) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        data: inputData
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async function fetchSearchRecommendations(inputValue) {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/search-recommendations?query=${inputValue}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching search recommendations:', error);
      return [];
    }
  }

  const handleSearch = async () => {
    try {
      const result = await predict(searchValue);
      setPredictionResult(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const onSearchChange = async (value) => {
    setSearchValue(value); // Update searchValue state
    if (value) {
      const recommendations = await fetchSearchRecommendations(value);
      setOptions(recommendations);
    }
  };

  return (
    <div className='heroContainer'>
      <div className="heroImg">
        <LazyLoadImage
          src={heroImg}
          alt='Hero Image'
          effect='blur'
          width={'100%'}
          height={'100%'}
          placeholderSrc={heroImg}
        />
      </div>
      <div className="overlay">
        <div className='heroText'>Find Your Dream Ghar</div>
        <AutoComplete
          options={options.map((option, index) => ({
            value: option,
            key: index
          }))}
          style={{ width: 400 }}
          onSelect={handleSearch}
          onSearch={onSearchChange}
          onChange={onSearchChange}
          value={searchValue} // Controlled component value
          placeholder={`Try "Property in Thane with area of 1000sqft"`}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button> {/* Add search button */}
      </div>
    </div>
  );
};

export default Hero;
