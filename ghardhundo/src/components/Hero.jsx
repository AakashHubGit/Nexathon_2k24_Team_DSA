import React from 'react'
import heroImg from '../assets/hero.jpg'
import '../css/Hero.css'
import { Input, Space } from 'antd';
import axios from 'axios';
const { Search } = Input;

const Hero = ({setPredictionResult}) => {


  // Function to make a POST request to the Flask server
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
  const handleSearch = async (value) => {
    try {
      // Call the predict function with the searched value
      const result = await predict(value);
      // Handle the result as needed
      console.log('Prediction result:', result.prediction);
      console.log('Prediction Project:', result.category);
      setPredictionResult(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className='heroContainer'>
      <img className='heroImg' src={heroImg} alt="" />
      <div className="overlay">
        <div className='heroText'>Find Your Dream Ghar</div>
        <Search
          placeholder={`Try "Property in Thane with area of 1000sqft"`}
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch} // Pass the handleSearch function
        />
      </div>
    </div>
  )
}

export default Hero
