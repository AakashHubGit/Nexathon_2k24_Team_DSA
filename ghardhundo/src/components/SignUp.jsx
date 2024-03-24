import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/signup.css'
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userType: 'user',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

 

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
      const response = await axios.post(`http://localhost:5000/api/auth/create${formData.userType}`, formData);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error('Error signing up:', error); // Handle error
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Slider {...sliderSettings}>
        <div>
          <form onSubmit={handleSignUp}>
            <input type="hidden" name="userType" value="user" />
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up as User</button>
            <div>Already Signed Up?? </div>
            <Link />
          </form>
        </div>
        <div>
          <form onSubmit={handleSignUp}>
            <input type="hidden" name="userType" value="owner" />
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
            <button type="submit">Sign Up as Owner</button>
          </form>
        </div>
      </Slider>
    </div>
  );
};

export default SignUp;
