import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/signup.css'
import { Link } from 'react-router-dom';

const SignUp = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    userType: 'user',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/auth/create${formData.userType}`, formData);
      console.log(response.data); // Handle success
      setIsAuthenticated(true);
      navigate("/")
    } catch (error) {
      console.error('Error signing up:', error); // Handle error
    }
  };

  const handleSliderChange = (index) => {
    setFormData(prevState => ({
      ...prevState,
      userType: index === 0 ? 'user' : 'owner'
    }));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => handleSliderChange(newIndex)
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Slider {...sliderSettings}>
        <div>
            <h3>Sign Up as User</h3>
          <form onSubmit={handleSignUp}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
        <div>
        <h3>Sign Up as Owner</h3>
          <form onSubmit={handleSignUp}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
      </Slider>
    </div>
  );
};

export default SignUp;
