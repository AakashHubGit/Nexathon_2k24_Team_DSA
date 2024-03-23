import React from 'react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';

const SignIn = () => {
    const [formData, setFormData] = useState({
      userType: 'user',
      name: '',
      email: '',
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
  
    const handleSignIn = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:5000/api/auth/login${formData.userType}`, formData);
        console.log(response.data); // Handle success
        navigate('/'); // Redirect to home page
      } catch (error) {
        console.error('Error signing in:', error); // Handle error
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
    <div className="signin-container">
      <h2>Sign In</h2>
      <Slider {...sliderSettings}>
        <div>
          <form onSubmit={handleSignIn}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign In as User</button>
          </form>
        </div>
        <div>
          <form onSubmit={handleSignIn}>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign In as Owner</button>
          </form>
        </div>
      </Slider>
    </div>
  )
}

export default SignIn